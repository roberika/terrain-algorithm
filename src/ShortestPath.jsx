import { useEffect, useState, useRef } from "react";
import pauseIcon from "/pause-icon.svg";
import prevIcon from "/prev-icon.svg";
import nextIcon from "/next-icon.svg";
import watchIcon from "/watch-icon.svg";
import runIcon from "/run-icon.svg";
import backgroundImage from "/web-networkbackground.png";

function App() {
    const [heightMap, setHeightMap] = useState([])
    const [start, setStart] = useState([-1, -1])
    const [end, setEnd] = useState([-1, -1])
    const [heightDiff, setHeightDiff] = useState("x 1dm")

    const [path, setPath] = useState([])
    const [visited, setVisited] = useState([])
    const [options, setOptions] = useState([])
    const [length, setLength] = useState(0)
    const [check, setCheck] = useState(0)

    const [threshold, setThreshold] = useState(3)
    const [speed, setSpeed] = useState(100)
    const [recencyWeight, setRecencyWeight] = useState(1)
    const [elevationWeight, setElevationWeight] = useState(0)

    const [trigger, setTrigger] = useState(0)
    const [step, setStep] = useState(0)
    const [timer, setTimer] = useState("")

    // ran once
    const charToInt = (c, rowIndex, colIndex) => {
        if (c == "S") setStart((e) => [rowIndex, colIndex])
        if (c == "E") setEnd((e) => [rowIndex, colIndex])
        let h = c.charCodeAt(0)
        return (h >= 97 && h <= 122 ? h - 97 : (c == "E" ? 25 : (c == "S" ? 0 : 29)))
    }

    // ran once
    const toHeightMap = (s) => {
        return s.split("\n").map((e, rowIndex) => e.split("").filter((f) => f != "\r").map((g, colIndex) => charToInt(g, rowIndex, colIndex)))
    }

    // ran for every cell
    const getColor = (e, rowIndex, colIndex) => {
        // hue is static
        let saturation = 50 - (e * 2)
        let light = Math.round(e / 27 * 60) + 10
        
        // start
        if(rowIndex == start[0] && colIndex == start[1]) {
            return "blue"
        }
        // end
        if(rowIndex == end[0] && colIndex == end[1]) {
            return "red"
        }
        // tiles that the algorithm chose
        if(path && path.length && path[rowIndex][colIndex]) {
            return "hsl(" + (220) + ", " + (80) + "%, " + (light+10) + "%)"
        }
        // tiles that the algorithm considered
        if(options && options.length && options[rowIndex][colIndex]) {
            return "hsl(" + (10) + ", " + (80) + "%, " + (light) + "%)"
        }
        // tiles that the algorithm checked
        if(visited && visited.length && visited[rowIndex][colIndex]) {
            return "hsl(" + (100) + ", " + (80) + "%, " + (light) + "%)"
        }
        return "hsl(" + (80) + ", " + (saturation) + "%, " + (light) + "%)"
    }

    const processXYZ = (text) => {
        const sampling = 10
        const lines = text.split("\r\n").filter((e) => e != "X Y Z" && e != "")
        let coor = lines.flatMap((e, index) => {
            if((index % sampling == sampling / 2) &&
                (parseInt(index / 500) % sampling == sampling / 2)) return e
            //if(index % 500 < 50 && parseInt(index / 500) < 50) return e
            return []
        }).map((e) => e.split(" "))
        const coorx = coor.map((e) => parseInt(e[0])).filter((value, index, array) => array.indexOf(value) === index)
        const xmin = Math.min(...coorx)
        const xlength = coorx.length
        const coory = coor.map((e) => parseInt(e[1])).filter((value, index, array) => array.indexOf(value) === index)
        const ymin = Math.min(...coory)
        const coorz = coor.map((e) => parseFloat(e[2]))
        const zmin = Math.min(...coorz)
        const zcoef = Math.max(...coorz) - zmin
        
        setHeightDiff((e) => "x " + parseInt(zcoef*10/25/sampling) + "dm")
        return coory.map((e, colIndex) => coorx.map((f, rowIndex) => 
            parseInt((coorz[colIndex * xlength + rowIndex] - zmin) / zcoef * 25)
        ))
    }

    // ran every file upload
    const handleFileChange = async (e) => {
        resetRender("reset")
        setHeightMap((e) => [])
        e.preventDefault()
        const reader = new FileReader()
        if(e.target.files[0].name.toLowerCase().endsWith(".xyz")) {
            reader.onload = async (e) => { 
                const text = (e.target.result)
                setHeightMap((e) => processXYZ(text))
            }
        } else {
            reader.onload = async (e) => { 
                const text = (e.target.result)
                setHeightMap((e) => toHeightMap(text))
            }
        }
        reader.readAsText(e.target.files[0])
    }

    // ran every frame (blegh) (bottleneck)
    const solve = () => {
        // it's more efficient to start from the end to avoid trap craters
        // starting from the end ensures that you only go to place you could
        // exit from rather than places you could enter in
        if(start[0] == -1 || start[1] == -1 || end[0] == -1 || end[1] == -1) return;

        const startingPoint = [...end, 0, 0, 0, 0]
        const queue = [startingPoint]
        const options = heightMap.map((e) => e.map((f) => false))
        const visited = heightMap.map((e) => e.map((f) => false))
        const paths = []
        let count = 0

        while (queue.length && count < step) {
            queue.sort((a, b) => (a[2] - b[2]) * elevationWeight + (a[5] - b[5]) * recencyWeight)
            const vertex = queue.shift();

            // node is unvisited
            if (!visited[vertex[0]][vertex[1]]) {
                const x = vertex[1]
                const y = vertex[0]
                count += 1

                visited[y][x] = true
                options[y][x] = false
                paths.push([[vertex[3], vertex[4]], [y, x]])

                for (let dir of [1, -1]) {
                    for (let move of [[dir, 0], [0, dir]]) {
                        let x2 = x + move[0]
                        if (x2 >= 0 && x2 < heightMap[y].length && !visited[y][x2] && !options[y][x2] && traversable(x, y, x2, y)) {
                            queue.push([y, x2, heightMap[y][x2], y, x, vertex[5] + 1])
                            options[y][x2] = true
                        }
                        let y2 = y + move[1]
                        if (y2 >= 0 && y2 < heightMap.length && !visited[y2][x] && !options[y2][x] && traversable(x, y, x, y2)) {
                            queue.push([y2, x, heightMap[y2][x], y, x, vertex[5] + 1])
                            options[y2][x] = true
                        }
                    }
                }
            }

            // found the start
            if(visited[start[0]][start[1]]) {
                pauseRender()
                const optimalPath = heightMap.map((e) => e.map((f) => false))
                var currentCell = [start[0], start[1]]
                var length = 0
                optimalPath[start[0]][start[1]] = true
                while (currentCell[0] != end[0] || currentCell[1] != end[1]) {
                    let bestPath = paths.filter((e) => e[1][0] == currentCell[0] && e[1][1] == currentCell[1])
                    currentCell = [bestPath[0][0][0], bestPath[0][0][1]]
                    optimalPath[currentCell[0]][currentCell[1]] = true
                    length += 1
                }
                setCheck((e) => count)
                setLength((e) => 0)
                setOptions((e) => options)
                setVisited((e) => visited)
                setPath((e) => optimalPath)
                setLength((e) => length)
                return;
            }
        }
        setCheck((e) => count)
        setLength((e) => 0)
        setOptions((e) => options)
        setVisited((e) => visited)
        setPath((e) => [])
    }

    const traversable = (x1, y1, x2, y2) => {
        return heightMap[y2][x2] - heightMap[y1][x1] >= -threshold 
    }

    const pauseRender = (offset = 0) => {
        clearInterval(timer)
        setTimer((e) => "")
        if (offset === "reset") {
            resetRender()
            return
        }
        setStep((e) => e + offset)
        setLength((e) => 0)
        setTrigger((e) => e + 1)
    }

    const resetRender = () => {
        setPath((e) => [])
        setVisited((e) => [])
        setOptions((e) => [])
        setStep((e) => 0)
        setCheck((e) => 0)
        setLength((e) => 0)
    }

    useEffect(() => {
        if (heightMap && heightMap.length) {
            pauseRender("reset")
        }
    }, [heightMap])

    useEffect(() => {
        if (heightMap && heightMap.length) solve()
    }, [step, trigger])

    useEffect(() => {
        return () => clearInterval(timer)
    }, []);

    const changeStart = (rowIndex, colIndex) => {
        setStart((e) => [rowIndex, colIndex])
        pauseRender("reset")
        setTrigger((e) => e + 1)
    }

    const changeEnd = (rowIndex, colIndex) => {
        setEnd((e) => [rowIndex, colIndex])
        pauseRender("reset")
        setTrigger((e) => e + 1)
    }

    return <div className="panel-view" style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="left-panel">
            <div className="data-table">
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    Height Map Traversal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <input id="file" type="file" onChange={handleFileChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Optimal Path</td>
                                <td>{length == 0 ? "Unknown" : length}</td>
                            </tr>
                            <tr>
                                <td>Current Steps</td>
                                <td>{check}</td>
                            </tr>
                            <tr>
                                <td>Step Threshold</td>
                                <td><input className="data-input" min={1} id="threshold" type="number" value={threshold} onChange={(e) => {setThreshold((f) => e.target.value) ; solve()}}/><br/>{heightDiff} per langkah</td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td><input className="data-input" min={1} id="speed" type="number" value={speed} onChange={(e) => {setSpeed((f) => e.target.value) ; solve()}}/></td>
                            </tr>
                            <tr>
                                <td>Recency Weight</td>
                                <td><input className="data-input" id="recency-weight" type="number" value={recencyWeight} onChange={(e) => {setRecencyWeight((f) => e.target.value) ; solve()}}/></td>
                            </tr>
                            <tr>
                                <td>Elevation Weight</td>
                                <td><input className="data-input" id="elevation-weight" type="number" value={elevationWeight} onChange={(e) => {setElevationWeight((f) => e.target.value) ; solve()}}/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Klik kanan untuk tambah titik awal</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Klik kiri untuk tambah titik akhir</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <a href="https://github.com/roberika/terrain-algorithm/tree/main/src/test-maps" rel="noopener noreferrer" target="_blank" className="text-blue-900 font-bold underline">Download data test</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div className="control-panel">
                <button className="control-button control-button-pause" onClick={() => {pauseRender(0)}}>
                    <img src={pauseIcon} alt=""></img>
                    <span className="tooltiptext">Pause</span>
                </button>
                <button className="control-button control-button-prev" onClick={() => {pauseRender(-1)}}>
                    <img src={prevIcon} alt=""></img>
                    <span className="tooltiptext">Step Back</span>
                </button>
                <button className="control-button control-button-next" onClick={() => {pauseRender(1)}}>
                    <img src={nextIcon} alt=""></img>
                    <span className="tooltiptext">Step Forward</span>
                </button>
                <button className="control-button control-button-watch" onClick={() => {pauseRender(700)}}>
                    <img src={watchIcon} alt=""></img>
                    <span className="tooltiptext">Skip Forward</span>
                </button>
                <button className="control-button control-button-run" onClick={() => {
                    setTimer((e) => setInterval(() => {
                        setStep((e) => e + speed)
                        setTrigger((e) => e + 1)
                    }, 100))
                }}>
                    <img src={runIcon} alt=""></img>
                    <span className="tooltiptext">Run</span>
                </button>
            </div>
        </div>
        <div className="right-panel">
            {heightMap.length ? <div className="heightmap">
                {heightMap.map((row, rowIndex) => (
                    <div key={rowIndex} className="heightmap-row">
                        {row.map((col, colIndex) => (
                            <div key={colIndex} className={"heightmap-cell"} style={{backgroundColor: getColor(col, rowIndex, colIndex)}}>
                                <input className="heightmap-text" type="button" onClick={(e) => changeStart(rowIndex, colIndex)} onContextMenu={(e) => changeEnd(rowIndex, colIndex)}/>
                            </div>
                        ))}
                    </div>
                ))}
            </div> : <div className="m-auto bg-slate-100 p-4 rounded-md">Please load your height map</div>} 
        </div>
    </div>
} 

export default App;
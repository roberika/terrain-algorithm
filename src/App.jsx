import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const UNEXPLORED = "unexplored-tile";
const WALKED = "walked-tile";
const PAVED = "paved-tile";
const HIGHLIGHTED = "highlighted-tile";

const BORDER_UP = "border-up";
const BORDER_DOWN = "border-down";
const BORDER_LEFT = "border-left";
const BORDER_RIGHT = "border_right";
const BORDER_NONE = "";

// Step is counted on each render
const CHECKPOINT = null;

function App() {
  // On each step, highlight it and save the type for later
  // Append () => this.frame(params) to renderStack for animation frames
  const FRAME = (maze, x, y, type, prev_x, prev_y) => {
    temp_body = body
    cur_cell = temp_body[x][y]
    prev_cell = temp_body[maze.head.y][maze.head.x]
    head_cell = temp_body[maze.head.y][maze.head.x]

    // When not walking, unmark the walked tiles
    if (type != WALKED) {
      temp_body.map((row) => row.map((cell) => {
        if (cell.border == WALKED) {
          cell.border = UNEXPLORED
        }
      }))
      if (type == PAVED) {
        // Border is a 4 attribute object which is initially rendered
        // with all of them active and proken down when paved
        if (x - prev_x == 0) {
          if (y - prev_y == 0) {
            // They're for some reason the same square
          } else if (y - prev_y == 1) {
            cur_cell.border.up = BORDER_NONE
            prev_cell.border.down = BORDER_NONE
          } else {
            cur_cell.border.down = BORDER_NONE
            prev_cell.border.up = BORDER_NONE
          }
        } else if (x - prev_x == 1) {
          cur_cell.border.left = BORDER_NONE
          prev_cell.border.right = BORDER_NONE
        } else {
          cur_cell.border.right = BORDER_NONE
          prev_cell.border.left = BORDER_NONE
        }
      }
    }
    cur_cell.type = HIGHLIGHTED
    head_cell.type = maze.head.type

    temp_body[y][x] = cur_cell
    temp_body[prev_y][prev_x] = prev_cell
    temp_body[maze.head.y][maze.head.x] = head_cell

    setMaze({
      head: {x: x, y: y, type: type},
      body: temp_body
    })
  }

  render = () => {
    // Reset maze
    maze = []
    cur_steps = 0
    cur_checkpoints = 0
    // Render everything from the render stack
    for (let e in renderStack) {
      if (e == CHECKPOINT) {
        cur_checkpoints++
        continue
      }
      e()
      cur_steps++
    }
  }


  // Animation renderer clock
  useEffect(() => {
    const interval = setInterval(() => {
      if (renderStack[steps] == CHECKPOINT) {
        setCheckpoints(checkpoints + 1)
        return;
      }
      render()
      setSteps(steps + 1)
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // The rendering stack
  const [renderStack, setRenderStack] = useState([]);
  // Until what step the render stops at
  const [steps, setSteps] = useState(-1);
  // Until what checkpoint the render stops at
  const [checkpoints, setCheckpoints] = useState(-1);
  // The maze
  const [maze, setMaze] = useState({
    head: {x: -1, y: -1, type: UNEXPLORED},
    body: [[],],
  });

  return (<div className='panel-view'>
    <div className='side-panel'>

    </div>
    <div className='main-panel'>
      <table className='maze'>
        <tbody>
          <tr>
            <td>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default App


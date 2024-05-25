import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import ForceGraph2D from 'react-force-graph-2d';
import pauseIcon from "/pause-icon.svg";
import prevIcon from "/prev-icon.svg";
import nextIcon from "/next-icon.svg";
import watchIcon from "/watch-icon.svg";
import runIcon from "/run-icon.svg";
import backgroundImage from "/web-networkbackground.png";

function App() {
    const [data, setData] = useState({
        nodes: [
          {"id": "Myriel", "group": 1},
          {"id": "Napoleon", "group": 1},
          {"id": "Mlle.Baptistine", "group": 1},
          {"id": "Mme.Magloire", "group": 1},
          {"id": "CountessdeLo", "group": 1},
          {"id": "Geborand", "group": 1},
          {"id": "Champtercier", "group": 1},
          {"id": "Cravatte", "group": 1},
          {"id": "Count", "group": 1},
          {"id": "OldMan", "group": 1},
          {"id": "Labarre", "group": 2},
          {"id": "Valjean", "group": 2},
          {"id": "Marguerite", "group": 3},
          {"id": "Mme.deR", "group": 2},
          {"id": "Isabeau", "group": 2},
          {"id": "Gervais", "group": 2},
          {"id": "Tholomyes", "group": 3},
          {"id": "Listolier", "group": 3},
          {"id": "Fameuil", "group": 3},
          {"id": "Blacheville", "group": 3},
          {"id": "Favourite", "group": 3},
          {"id": "Dahlia", "group": 3},
          {"id": "Zephine", "group": 3},
          {"id": "Fantine", "group": 3},
          {"id": "Mme.Thenardier", "group": 4},
          {"id": "Thenardier", "group": 4},
          {"id": "Cosette", "group": 5},
          {"id": "Javert", "group": 4},
          {"id": "Fauchelevent", "group": 0},
          {"id": "Bamatabois", "group": 2},
          {"id": "Perpetue", "group": 3},
          {"id": "Simplice", "group": 2},
          {"id": "Scaufflaire", "group": 2},
          {"id": "Woman1", "group": 2},
          {"id": "Judge", "group": 2},
          {"id": "Champmathieu", "group": 2},
          {"id": "Brevet", "group": 2},
          {"id": "Chenildieu", "group": 2},
          {"id": "Cochepaille", "group": 2},
          {"id": "Pontmercy", "group": 4},
          {"id": "Boulatruelle", "group": 6},
          {"id": "Eponine", "group": 4},
          {"id": "Anzelma", "group": 4},
          {"id": "Woman2", "group": 5},
          {"id": "MotherInnocent", "group": 0},
          {"id": "Gribier", "group": 0},
          {"id": "Jondrette", "group": 7},
          {"id": "Mme.Burgon", "group": 7},
          {"id": "Gavroche", "group": 8},
          {"id": "Gillenormand", "group": 5},
          {"id": "Magnon", "group": 5},
          {"id": "Mlle.Gillenormand", "group": 5},
          {"id": "Mme.Pontmercy", "group": 5},
          {"id": "Mlle.Vaubois", "group": 5},
          {"id": "Lt.Gillenormand", "group": 5},
          {"id": "Marius", "group": 8},
          {"id": "BaronessT", "group": 5},
          {"id": "Mabeuf", "group": 8},
          {"id": "Enjolras", "group": 8},
          {"id": "Combeferre", "group": 8},
          {"id": "Prouvaire", "group": 8},
          {"id": "Feuilly", "group": 8},
          {"id": "Courfeyrac", "group": 8},
          {"id": "Bahorel", "group": 8},
          {"id": "Bossuet", "group": 8},
          {"id": "Joly", "group": 8},
          {"id": "Grantaire", "group": 8},
          {"id": "MotherPlutarch", "group": 9},
          {"id": "Gueulemer", "group": 4},
          {"id": "Babet", "group": 4},
          {"id": "Claquesous", "group": 4},
          {"id": "Montparnasse", "group": 4},
          {"id": "Toussaint", "group": 5},
          {"id": "Child1", "group": 10},
          {"id": "Child2", "group": 10},
          {"id": "Brujon", "group": 4},
          {"id": "Mme.Hucheloup", "group": 8}
        ],
        links: [
          {"source": "Napoleon", "target": "Myriel", "value": 1},
          {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
          {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
          {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
          {"source": "CountessdeLo", "target": "Myriel", "value": 1},
          {"source": "Geborand", "target": "Myriel", "value": 1},
          {"source": "Champtercier", "target": "Myriel", "value": 1},
          {"source": "Cravatte", "target": "Myriel", "value": 1},
          {"source": "Count", "target": "Myriel", "value": 2},
          {"source": "OldMan", "target": "Myriel", "value": 1},
          {"source": "Valjean", "target": "Labarre", "value": 1},
          {"source": "Valjean", "target": "Mme.Magloire", "value": 3},
          {"source": "Valjean", "target": "Mlle.Baptistine", "value": 3},
          {"source": "Valjean", "target": "Myriel", "value": 5},
          {"source": "Marguerite", "target": "Valjean", "value": 1},
          {"source": "Mme.deR", "target": "Valjean", "value": 1},
          {"source": "Isabeau", "target": "Valjean", "value": 1},
          {"source": "Gervais", "target": "Valjean", "value": 1},
          {"source": "Listolier", "target": "Tholomyes", "value": 4},
          {"source": "Fameuil", "target": "Tholomyes", "value": 4},
          {"source": "Fameuil", "target": "Listolier", "value": 4},
          {"source": "Blacheville", "target": "Tholomyes", "value": 4},
          {"source": "Blacheville", "target": "Listolier", "value": 4},
          {"source": "Blacheville", "target": "Fameuil", "value": 4},
          {"source": "Favourite", "target": "Tholomyes", "value": 3},
          {"source": "Favourite", "target": "Listolier", "value": 3},
          {"source": "Favourite", "target": "Fameuil", "value": 3},
          {"source": "Favourite", "target": "Blacheville", "value": 4},
          {"source": "Dahlia", "target": "Tholomyes", "value": 3},
          {"source": "Dahlia", "target": "Listolier", "value": 3},
          {"source": "Dahlia", "target": "Fameuil", "value": 3},
          {"source": "Dahlia", "target": "Blacheville", "value": 3},
          {"source": "Dahlia", "target": "Favourite", "value": 5},
          {"source": "Zephine", "target": "Tholomyes", "value": 3},
          {"source": "Zephine", "target": "Listolier", "value": 3},
          {"source": "Zephine", "target": "Fameuil", "value": 3},
          {"source": "Zephine", "target": "Blacheville", "value": 3},
          {"source": "Zephine", "target": "Favourite", "value": 4},
          {"source": "Zephine", "target": "Dahlia", "value": 4},
          {"source": "Fantine", "target": "Tholomyes", "value": 3},
          {"source": "Fantine", "target": "Listolier", "value": 3},
          {"source": "Fantine", "target": "Fameuil", "value": 3},
          {"source": "Fantine", "target": "Blacheville", "value": 3},
          {"source": "Fantine", "target": "Favourite", "value": 4},
          {"source": "Fantine", "target": "Dahlia", "value": 4},
          {"source": "Fantine", "target": "Zephine", "value": 4},
          {"source": "Fantine", "target": "Marguerite", "value": 2},
          {"source": "Fantine", "target": "Valjean", "value": 9},
          {"source": "Mme.Thenardier", "target": "Fantine", "value": 2},
          {"source": "Mme.Thenardier", "target": "Valjean", "value": 7},
          {"source": "Thenardier", "target": "Mme.Thenardier", "value": 13},
          {"source": "Thenardier", "target": "Fantine", "value": 1},
          {"source": "Thenardier", "target": "Valjean", "value": 12},
          {"source": "Cosette", "target": "Mme.Thenardier", "value": 4},
          {"source": "Cosette", "target": "Valjean", "value": 31},
          {"source": "Cosette", "target": "Tholomyes", "value": 1},
          {"source": "Cosette", "target": "Thenardier", "value": 1},
          {"source": "Javert", "target": "Valjean", "value": 17},
          {"source": "Javert", "target": "Fantine", "value": 5},
          {"source": "Javert", "target": "Thenardier", "value": 5},
          {"source": "Javert", "target": "Mme.Thenardier", "value": 1},
          {"source": "Javert", "target": "Cosette", "value": 1},
          {"source": "Fauchelevent", "target": "Valjean", "value": 8},
          {"source": "Fauchelevent", "target": "Javert", "value": 1},
          {"source": "Bamatabois", "target": "Fantine", "value": 1},
          {"source": "Bamatabois", "target": "Javert", "value": 1},
          {"source": "Bamatabois", "target": "Valjean", "value": 2},
          {"source": "Perpetue", "target": "Fantine", "value": 1},
          {"source": "Simplice", "target": "Perpetue", "value": 2},
          {"source": "Simplice", "target": "Valjean", "value": 3},
          {"source": "Simplice", "target": "Fantine", "value": 2},
          {"source": "Simplice", "target": "Javert", "value": 1},
          {"source": "Scaufflaire", "target": "Valjean", "value": 1},
          {"source": "Woman1", "target": "Valjean", "value": 2},
          {"source": "Woman1", "target": "Javert", "value": 1},
          {"source": "Judge", "target": "Valjean", "value": 3},
          {"source": "Judge", "target": "Bamatabois", "value": 2},
          {"source": "Champmathieu", "target": "Valjean", "value": 3},
          {"source": "Champmathieu", "target": "Judge", "value": 3},
          {"source": "Champmathieu", "target": "Bamatabois", "value": 2},
          {"source": "Brevet", "target": "Judge", "value": 2},
          {"source": "Brevet", "target": "Champmathieu", "value": 2},
          {"source": "Brevet", "target": "Valjean", "value": 2},
          {"source": "Brevet", "target": "Bamatabois", "value": 1},
          {"source": "Chenildieu", "target": "Judge", "value": 2},
          {"source": "Chenildieu", "target": "Champmathieu", "value": 2},
          {"source": "Chenildieu", "target": "Brevet", "value": 2},
          {"source": "Chenildieu", "target": "Valjean", "value": 2},
          {"source": "Chenildieu", "target": "Bamatabois", "value": 1},
          {"source": "Cochepaille", "target": "Judge", "value": 2},
          {"source": "Cochepaille", "target": "Champmathieu", "value": 2},
          {"source": "Cochepaille", "target": "Brevet", "value": 2},
          {"source": "Cochepaille", "target": "Chenildieu", "value": 2},
          {"source": "Cochepaille", "target": "Valjean", "value": 2},
          {"source": "Cochepaille", "target": "Bamatabois", "value": 1},
          {"source": "Pontmercy", "target": "Thenardier", "value": 1},
          {"source": "Boulatruelle", "target": "Thenardier", "value": 1},
          {"source": "Eponine", "target": "Mme.Thenardier", "value": 2},
          {"source": "Eponine", "target": "Thenardier", "value": 3},
          {"source": "Anzelma", "target": "Eponine", "value": 2},
          {"source": "Anzelma", "target": "Thenardier", "value": 2},
          {"source": "Anzelma", "target": "Mme.Thenardier", "value": 1},
          {"source": "Woman2", "target": "Valjean", "value": 3},
          {"source": "Woman2", "target": "Cosette", "value": 1},
          {"source": "Woman2", "target": "Javert", "value": 1},
          {"source": "MotherInnocent", "target": "Fauchelevent", "value": 3},
          {"source": "MotherInnocent", "target": "Valjean", "value": 1},
          {"source": "Gribier", "target": "Fauchelevent", "value": 2},
          {"source": "Mme.Burgon", "target": "Jondrette", "value": 1},
          {"source": "Gavroche", "target": "Mme.Burgon", "value": 2},
          {"source": "Gavroche", "target": "Thenardier", "value": 1},
          {"source": "Gavroche", "target": "Javert", "value": 1},
          {"source": "Gavroche", "target": "Valjean", "value": 1},
          {"source": "Gillenormand", "target": "Cosette", "value": 3},
          {"source": "Gillenormand", "target": "Valjean", "value": 2},
          {"source": "Magnon", "target": "Gillenormand", "value": 1},
          {"source": "Magnon", "target": "Mme.Thenardier", "value": 1},
          {"source": "Mlle.Gillenormand", "target": "Gillenormand", "value": 9},
          {"source": "Mlle.Gillenormand", "target": "Cosette", "value": 2},
          {"source": "Mlle.Gillenormand", "target": "Valjean", "value": 2},
          {"source": "Mme.Pontmercy", "target": "Mlle.Gillenormand", "value": 1},
          {"source": "Mme.Pontmercy", "target": "Pontmercy", "value": 1},
          {"source": "Mlle.Vaubois", "target": "Mlle.Gillenormand", "value": 1},
          {"source": "Lt.Gillenormand", "target": "Mlle.Gillenormand", "value": 2},
          {"source": "Lt.Gillenormand", "target": "Gillenormand", "value": 1},
          {"source": "Lt.Gillenormand", "target": "Cosette", "value": 1},
          {"source": "Marius", "target": "Mlle.Gillenormand", "value": 6},
          {"source": "Marius", "target": "Gillenormand", "value": 12},
          {"source": "Marius", "target": "Pontmercy", "value": 1},
          {"source": "Marius", "target": "Lt.Gillenormand", "value": 1},
          {"source": "Marius", "target": "Cosette", "value": 21},
          {"source": "Marius", "target": "Valjean", "value": 19},
          {"source": "Marius", "target": "Tholomyes", "value": 1},
          {"source": "Marius", "target": "Thenardier", "value": 2},
          {"source": "Marius", "target": "Eponine", "value": 5},
          {"source": "Marius", "target": "Gavroche", "value": 4},
          {"source": "BaronessT", "target": "Gillenormand", "value": 1},
          {"source": "BaronessT", "target": "Marius", "value": 1},
          {"source": "Mabeuf", "target": "Marius", "value": 1},
          {"source": "Mabeuf", "target": "Eponine", "value": 1},
          {"source": "Mabeuf", "target": "Gavroche", "value": 1},
          {"source": "Enjolras", "target": "Marius", "value": 7},
          {"source": "Enjolras", "target": "Gavroche", "value": 7},
          {"source": "Enjolras", "target": "Javert", "value": 6},
          {"source": "Enjolras", "target": "Mabeuf", "value": 1},
          {"source": "Enjolras", "target": "Valjean", "value": 4},
          {"source": "Combeferre", "target": "Enjolras", "value": 15},
          {"source": "Combeferre", "target": "Marius", "value": 5},
          {"source": "Combeferre", "target": "Gavroche", "value": 6},
          {"source": "Combeferre", "target": "Mabeuf", "value": 2},
          {"source": "Prouvaire", "target": "Gavroche", "value": 1},
          {"source": "Prouvaire", "target": "Enjolras", "value": 4},
          {"source": "Prouvaire", "target": "Combeferre", "value": 2},
          {"source": "Feuilly", "target": "Gavroche", "value": 2},
          {"source": "Feuilly", "target": "Enjolras", "value": 6},
          {"source": "Feuilly", "target": "Prouvaire", "value": 2},
          {"source": "Feuilly", "target": "Combeferre", "value": 5},
          {"source": "Feuilly", "target": "Mabeuf", "value": 1},
          {"source": "Feuilly", "target": "Marius", "value": 1},
          {"source": "Courfeyrac", "target": "Marius", "value": 9},
          {"source": "Courfeyrac", "target": "Enjolras", "value": 17},
          {"source": "Courfeyrac", "target": "Combeferre", "value": 13},
          {"source": "Courfeyrac", "target": "Gavroche", "value": 7},
          {"source": "Courfeyrac", "target": "Mabeuf", "value": 2},
          {"source": "Courfeyrac", "target": "Eponine", "value": 1},
          {"source": "Courfeyrac", "target": "Feuilly", "value": 6},
          {"source": "Courfeyrac", "target": "Prouvaire", "value": 3},
          {"source": "Bahorel", "target": "Combeferre", "value": 5},
          {"source": "Bahorel", "target": "Gavroche", "value": 5},
          {"source": "Bahorel", "target": "Courfeyrac", "value": 6},
          {"source": "Bahorel", "target": "Mabeuf", "value": 2},
          {"source": "Bahorel", "target": "Enjolras", "value": 4},
          {"source": "Bahorel", "target": "Feuilly", "value": 3},
          {"source": "Bahorel", "target": "Prouvaire", "value": 2},
          {"source": "Bahorel", "target": "Marius", "value": 1},
          {"source": "Bossuet", "target": "Marius", "value": 5},
          {"source": "Bossuet", "target": "Courfeyrac", "value": 12},
          {"source": "Bossuet", "target": "Gavroche", "value": 5},
          {"source": "Bossuet", "target": "Bahorel", "value": 4},
          {"source": "Bossuet", "target": "Enjolras", "value": 10},
          {"source": "Bossuet", "target": "Feuilly", "value": 6},
          {"source": "Bossuet", "target": "Prouvaire", "value": 2},
          {"source": "Bossuet", "target": "Combeferre", "value": 9},
          {"source": "Bossuet", "target": "Mabeuf", "value": 1},
          {"source": "Bossuet", "target": "Valjean", "value": 1},
          {"source": "Joly", "target": "Bahorel", "value": 5},
          {"source": "Joly", "target": "Bossuet", "value": 7},
          {"source": "Joly", "target": "Gavroche", "value": 3},
          {"source": "Joly", "target": "Courfeyrac", "value": 5},
          {"source": "Joly", "target": "Enjolras", "value": 5},
          {"source": "Joly", "target": "Feuilly", "value": 5},
          {"source": "Joly", "target": "Prouvaire", "value": 2},
          {"source": "Joly", "target": "Combeferre", "value": 5},
          {"source": "Joly", "target": "Mabeuf", "value": 1},
          {"source": "Joly", "target": "Marius", "value": 2},
          {"source": "Grantaire", "target": "Bossuet", "value": 3},
          {"source": "Grantaire", "target": "Enjolras", "value": 3},
          {"source": "Grantaire", "target": "Combeferre", "value": 1},
          {"source": "Grantaire", "target": "Courfeyrac", "value": 2},
          {"source": "Grantaire", "target": "Joly", "value": 2},
          {"source": "Grantaire", "target": "Gavroche", "value": 1},
          {"source": "Grantaire", "target": "Bahorel", "value": 1},
          {"source": "Grantaire", "target": "Feuilly", "value": 1},
          {"source": "Grantaire", "target": "Prouvaire", "value": 1},
          {"source": "MotherPlutarch", "target": "Mabeuf", "value": 3},
          {"source": "Gueulemer", "target": "Thenardier", "value": 5},
          {"source": "Gueulemer", "target": "Valjean", "value": 1},
          {"source": "Gueulemer", "target": "Mme.Thenardier", "value": 1},
          {"source": "Gueulemer", "target": "Javert", "value": 1},
          {"source": "Gueulemer", "target": "Gavroche", "value": 1},
          {"source": "Gueulemer", "target": "Eponine", "value": 1},
          {"source": "Babet", "target": "Thenardier", "value": 6},
          {"source": "Babet", "target": "Gueulemer", "value": 6},
          {"source": "Babet", "target": "Valjean", "value": 1},
          {"source": "Babet", "target": "Mme.Thenardier", "value": 1},
          {"source": "Babet", "target": "Javert", "value": 2},
          {"source": "Babet", "target": "Gavroche", "value": 1},
          {"source": "Babet", "target": "Eponine", "value": 1},
          {"source": "Claquesous", "target": "Thenardier", "value": 4},
          {"source": "Claquesous", "target": "Babet", "value": 4},
          {"source": "Claquesous", "target": "Gueulemer", "value": 4},
          {"source": "Claquesous", "target": "Valjean", "value": 1},
          {"source": "Claquesous", "target": "Mme.Thenardier", "value": 1},
          {"source": "Claquesous", "target": "Javert", "value": 1},
          {"source": "Claquesous", "target": "Eponine", "value": 1},
          {"source": "Claquesous", "target": "Enjolras", "value": 1},
          {"source": "Montparnasse", "target": "Javert", "value": 1},
          {"source": "Montparnasse", "target": "Babet", "value": 2},
          {"source": "Montparnasse", "target": "Gueulemer", "value": 2},
          {"source": "Montparnasse", "target": "Claquesous", "value": 2},
          {"source": "Montparnasse", "target": "Valjean", "value": 1},
          {"source": "Montparnasse", "target": "Gavroche", "value": 1},
          {"source": "Montparnasse", "target": "Eponine", "value": 1},
          {"source": "Montparnasse", "target": "Thenardier", "value": 1},
          {"source": "Toussaint", "target": "Cosette", "value": 2},
          {"source": "Toussaint", "target": "Javert", "value": 1},
          {"source": "Toussaint", "target": "Valjean", "value": 1},
          {"source": "Child1", "target": "Gavroche", "value": 2},
          {"source": "Child2", "target": "Gavroche", "value": 2},
          {"source": "Child2", "target": "Child1", "value": 3},
          {"source": "Brujon", "target": "Babet", "value": 3},
          {"source": "Brujon", "target": "Gueulemer", "value": 3},
          {"source": "Brujon", "target": "Thenardier", "value": 3},
          {"source": "Brujon", "target": "Gavroche", "value": 1},
          {"source": "Brujon", "target": "Eponine", "value": 1},
          {"source": "Brujon", "target": "Claquesous", "value": 1},
          {"source": "Brujon", "target": "Montparnasse", "value": 1},
          {"source": "Mme.Hucheloup", "target": "Bossuet", "value": 1},
          {"source": "Mme.Hucheloup", "target": "Joly", "value": 1},
          {"source": "Mme.Hucheloup", "target": "Grantaire", "value": 1},
          {"source": "Mme.Hucheloup", "target": "Bahorel", "value": 1},
          {"source": "Mme.Hucheloup", "target": "Courfeyrac", "value": 1},
          {"source": "Mme.Hucheloup", "target": "Gavroche", "value": 1},
          {"source": "Mme.Hucheloup", "target": "Enjolras", "value": 1}
        ]
      })
    const [heightMap, setHeightMap] = useState([])
    const [start, setStart] = useState([0, 0])
    const [end, setEnd] = useState([0, 0])
    const [path, setPath] = useState([])
    const [visited, setVisited] = useState([])
    const [options, setOptions] = useState([])
    const [length, setLength] = useState(0)

    const [threshold, setThreshold] = useState(3)
    const [speed, setSpeed] = useState(100)
    const [recencyWeight, setRecencyWeight] = useState(1)
    const [elevationWeight, setElevationWeight] = useState(2)

    const [trigger, setTrigger] = useState(0)
    const [step, setStep] = useState(0)
    const [timer, setTimer] = useState("")
    const [aspectRatio, setAspectRatio] = useState("")

    // ran once
    const charToInt = (c, rowIndex, colIndex) => {
        if (c == "S") setStart((e) => [rowIndex, colIndex])
        if (c == "E") setEnd((e) => [rowIndex, colIndex])
        let h = c.charCodeAt(0)
        return (h >= 97 && h <= 122 ? h - 96 : (c == "E" ? 27 : (c == "S" ? 0 : 29)))
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
        if(heightMap[rowIndex][colIndex] == 0) {
            return "blue"
        }
        // end
        if(heightMap[rowIndex][colIndex] == 27) {
            return "red"
        }
        // tiles that the algorithm considered
        if(options && options.length && options[rowIndex][colIndex]) {
            return "hsl(" + (10) + ", " + (80) + "%, " + (light) + "%)"
        }
        // tiles that the algorithm checked
        if(visited && visited.length && visited[rowIndex][colIndex]) {
            return "hsl(" + (100) + ", " + (80) + "%, " + (light) + "%)"
        }
        // tiles that the algorithm chose
        if(path && path.length && path[rowIndex][colIndex]) {
            return "hsl(" + (220) + ", " + (80) + "%, " + (light+10) + "%)"
        }
        return "hsl(" + (80) + ", " + (saturation) + "%, " + (light) + "%)"
    }

    // ran every file upload
    const handleFileChange = async (e) => {
        resetRender()
        setHeightMap((e) => [])
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = (e.target.result)
            setHeightMap((e) => toHeightMap(text))
        };
        reader.readAsText(e.target.files[0])
    }

    // ran every frame (blegh) (bottleneck)
    const solve = () => {
        // it's more efficient to start from the end to avoid trap craters
        // starting from the end ensures that you only go to place you could
        // exit from rather than places you could enter in
        const startingPoint = [...end, 0, 0, 0, 0]
        const queue = [startingPoint]
        const options = heightMap.map((e) => e.map((f) => false))
        const visited = heightMap.map((e) => e.map((f) => false))
        const paths = []
        let count = 0

        while (queue.length && count < step) {
            queue.sort((a, b) => (a[2] - b[2]) * elevationWeight + (a[5] - b[5]) * recencyWeight)
            const vertex = queue.shift();

            if (!visited[vertex[0]][vertex[1]]) {
                const x = vertex[1]
                const y = vertex[0]
                count = count + 1

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
        }
        setStep((e) => count)
        setLength((e) => 0)

        setOptions((e) => options)
        setVisited((e) => visited)
        setPath((e) => [])

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
            setOptions((e) => [])
            setVisited((e) => [])
            setPath((e) => optimalPath)
            setLength((e) => length)
        }
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
        setStep((e) => e + offset);
    }

    const resetRender = () => {
        setPath((e) => [])
        setVisited((e) => [])
        setOptions((e) => [])
        setStep((e) => 0)
    }

    const getClassName = () => {
        let aspects = aspectRatio.split(" / ")
        return "heightmap " + ((aspects[0] / aspects[1]) > (4/3) ? "heightmap-bandaid" : "")
    }

    useEffect(() => {
        if (heightMap && heightMap.length) {
            setAspectRatio((e) => heightMap[0].length + " / " + heightMap.length)
            pauseRender("reset")
        }
    }, [heightMap])

    useEffect(() => {
        if (heightMap && heightMap.length) solve()
    }, [step, trigger])

    useEffect(() => {
        return () => clearInterval(timer)
    }, []);

//<input className="heightmap-text" type="button" onClick={() => setStart((e) => [rowIndex, colIndex])} onContextMenu={() => setEnd((e) => [rowIndex, colIndex])}/>

    return <div className="panel-view" style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="left-panel">
            <div className="data-table">
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>Height Map Traversal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <input id="file" type="file" onChange={handleFileChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Length</td>
                                <td>{length == 0 ? "Unknown" : length}</td>
                            </tr>
                            <tr>
                                <td>Threshold Height</td>
                                <td><input id="threshold" type="number" value={threshold} onChange={(e) => {setThreshold((f) => e.target.value) ; solve()}}/>dm</td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td><input id="speed" type="number" value={speed} onChange={(e) => {setSpeed((f) => e.target.value) ; solve()}}/></td>
                            </tr>
                            <tr>
                                <td>Recency Weight</td>
                                <td><input id="recency-weight" type="number" value={recencyWeight} onChange={(e) => {setRecencyWeight((f) => e.target.value) ; solve()}}/></td>
                            </tr>
                            <tr>
                                <td>Elevation Weight</td>
                                <td><input id="elevation-weight" type="number" value={elevationWeight} onChange={(e) => {setElevationWeight((f) => e.target.value) ; solve()}}/></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </form>
            </div>
            <div className="control-panel">
                <button className="control-button control-button-pause" onClick={() => {pauseRender(0)}}>
                    <img src={pauseIcon} alt=""></img>
                </button>
                <button className="control-button control-button-prev" onClick={() => {pauseRender(-1)}}>
                    <img src={prevIcon} alt=""></img>
                </button>
                <button className="control-button control-button-next" onClick={() => {pauseRender(1)}}>
                    <img src={nextIcon} alt=""></img>
                </button>
                <button className="control-button control-button-watch" onClick={() => {pauseRender(700)}}>
                    <img src={watchIcon} alt=""></img>
                </button>
                <button className="control-button control-button-run" onClick={() => {
                    setTimer((e) => setInterval(() => {
                        setStep((e) => e + speed)
                        setTrigger((e) => e + 1)
                    }, 100))
                }}>
                    <img src={runIcon} alt=""></img>
                </button>
            </div>
        </div>
        <div className="right-panel">
            {heightMap.length ? <div className={getClassName()} style={{aspectRatio: aspectRatio}}>
                {heightMap.map((row, rowIndex) => (
                    <div key={rowIndex} className="heightmap-row">
                        {row.map((col, colIndex) => (
                            <div key={colIndex} className={"heightmap-cell "} style={{backgroundColor: getColor(col, rowIndex, colIndex)}}>
                                
                            </div>
                        ))}
                    </div>
                ))}
            </div> : <div className="m-auto bg-slate-100 p-4 rounded-md">Please load your height map</div>} 
        </div>
    </div>
} 

export default App;
import logo from './images/logo.png';
import React, { Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuHouse } from "react-icons/lu";
import { LuBookText } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { LuCircleUser } from "react-icons/lu";
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

import Cours from "./Cours/Cours.js";

const courses = {}

function Header() {
    let profilePic = "";

    return <>
        <img src={logo} height="75px" alt="CegepAI"/>
        <div id="user">
            <FaChevronDown size={12} style={{color: "#444444", position : "relative", left : "10px", top : "11.5px"}}></FaChevronDown>
            {profilePic}
        </div>
    </>
}

function Acceuil() {
    return <p>bonjour</p>
}

function MenuBarInterior({selectedMenuBar, setSelectedMenuBar}) {

    function MenuBarOption({Icon,text,index}) {
        let color = (selectedMenuBar == index) ? "#8F63E8" : "black";
        return (<button className="menu-option" 
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => setSelectedMenuBar(index)}
                    >
            <div className="menu-option-content" style={{color}}>
                <Icon className="menu-option-icon"></Icon>
                <p className="menu-option-text">{text}</p>
            </div>
        </button>)
    }
    return <>
        <MenuBarOption Icon={LuHouse} text="Accueil" index={0}></MenuBarOption>
        <MenuBarOption Icon={LuBookText} text="Cours" index={1}></MenuBarOption>
        <MenuBarOption Icon={LuCalendarDays} text="Calendrier" index={2}></MenuBarOption>
        <MenuBarOption Icon={LuClipboardList} text="Exams" index={3}></MenuBarOption>
        <MenuBarOption Icon={LuCircleUser} text="Profil" index={4}></MenuBarOption>
    </>
}

function MenuBar({selectedMenuBar, setSelectedMenuBar}) {
    const [pos,setPos] = useState({x : 0.35*window.innerWidth, y : 0.8*window.innerHeight});
    const [relPos, setRelPos] = useState(null)
    const [dragging, setDragging] = useState(false);
    const [menuBarOpen, setMenuBarOpen] = useState(true);
    const [lastClick, setLastClick] = useState(-1000);
    const [lastMousePos, setLastMousePos] = useState({x : -1000, y : -1000});

    function onMouseDown(e) {
        let currentClick = e.timeStamp;
        let currentMousePos = {x : e.pageX, y : e.pageY};
        const bar = e.currentTarget.getBoundingClientRect();
        setRelPos({x : e.pageX - bar.left, y: e.pageY - bar.top});

        if (currentClick - lastClick < 200 && currentMousePos.x == lastMousePos.x && currentMousePos.y == lastMousePos.y) {
            setDragging(false);
            setMenuBarOpen(!menuBarOpen);
            setLastClick(currentClick);
            setLastMousePos(currentMousePos);
            return;
        }
        setDragging(true);
        setLastClick(currentClick);
        setLastMousePos(currentMousePos);
    }
    
    useEffect(() => {
        function onMouseMove(e) {
            if (!dragging) return;
            setPos({
                x: Math.min(0.7*window.innerWidth,Math.max(0,e.pageX - relPos.x)),
                y: Math.min(window.innerHeight-70,Math.max(0,e.pageY - relPos.y)),
            });
        }
    
        function onMouseUp(e) {
            setDragging(false);
        }

        if (dragging) {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        } 
        
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
    },
    [relPos, dragging]
    )

    return (
    <AnimatePresence>
        {menuBarOpen ? 
        <motion.div id="menu-bar"
            onMouseDown={onMouseDown}
            style={{
                left : pos.x,
                top : pos.y,
            }}
            animate={{
                left : pos.x,
                top : pos.y,
                width : 0.3*window.innerWidth,
                height : 70,
                opacity : 1,
            }}
            transition ={dragging ? {duration : 0} : {duration : 0.5}}
            >
            <MenuBarInterior selectedMenuBar={selectedMenuBar} setSelectedMenuBar={setSelectedMenuBar}></MenuBarInterior>
        </motion.div>
        : <motion.div id="menu-bar"
            onMouseDown={onMouseDown}
            style={{
                left : -30,
                top : 500,
            }}
            animate={{
                left : -30,
                top : 500,
                width : 200,
                height : 20,
                opacity : 0,
            }}>
            <MenuBarInterior selectedMenuBar={selectedMenuBar} setSelectedMenuBar={setSelectedMenuBar}></MenuBarInterior>
        </motion.div>}
    </AnimatePresence>)
}


  

export default function CegepAI() {
    const [selectedMenuBar, setSelectedMenuBar] = useState(0);
    return <>
        <div id="header">
            {Header()}
        </div>
        <div id="content">
            {(selectedMenuBar == 0) && <Acceuil></Acceuil>}
            {(selectedMenuBar == 1) && <Cours></Cours>}
        </div>
        <MenuBar selectedMenuBar={selectedMenuBar} setSelectedMenuBar={setSelectedMenuBar}></MenuBar>
    </>
}
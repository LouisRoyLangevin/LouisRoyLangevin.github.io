import logo from './images/logo.png';
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { LuArrowLeftFromLine, LuArrowRightFromLine } from "react-icons/lu";
import { TfiShiftLeft, TfiShiftRight } from "react-icons/tfi";
import { TbBookmarkAi } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { PiChartPieSliceDuotone } from "react-icons/pi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircle } from "react-icons/fa";
import { GiCircle } from "react-icons/gi";
import { LuHouse } from "react-icons/lu";
import { LuBookText } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { LuCircleUser } from "react-icons/lu";

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

function SideBar({leftSectionContentOpen,setLeftSectionContentOpen, setLeftContentClosedOnce}) {
    let arrow = (
        (leftSectionContentOpen) ?
        <TfiShiftRight size={23} color="#363853"/>
        :
        <TfiShiftLeft size={23} color="#363853" />
    )

    return <>
        <div id="side-bar">
            <div id="side-bar-box">
                <button id="side-bar-opener" onClick={() => {setLeftSectionContentOpen(!leftSectionContentOpen); setLeftContentClosedOnce(true)}}>
                    {arrow}
                </button>
                <div id="side-bar-box-separator"></div>
                <button id="side-bar-bookmark">
                    <CiBookmark size={32} style={{margin : "auto"}}/>
                </button>
            </div>
        </div>
    </>
}

function LeftSectionBoxButton({name, key, selectedCourse, setSelectedCourse}) {
    return <>
        <button className={`left-section-box-button ${(name === selectedCourse) ? "selected" : ""}`} onClick={() => setSelectedCourse(name)} key={key}>
            {name}
        </button>
    </>
}

function LeftSectionBox({name, options, selectedCourse, setSelectedCourse}) {
    const [boxOpen, setBoxOpen] = useState(false);
    let flecheSessionActuelle = (
        (boxOpen) ?
        <BsChevronDown style={{color: "#B8B8B8"}}/>
        :
        <BsChevronUp style={{color: "#B8B8B8"}}/>
    )
    return <>
        <div id="left-section-box">
            <button id="left-section-box-top" onClick={() => setBoxOpen(!boxOpen)}>
                <div style={{display : "flex", alignItems : "center"}}>
                <PiChartPieSliceDuotone size={23} />
                <p style={{marginLeft : "9px"}}>{name}</p>
                </div>
                {flecheSessionActuelle}
            </button>
            <AnimatePresence>
                {boxOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0,
                        transition : {
                            opacity : {duration : 0.2},
                            height : {duration : 0.3}
                        }
                    }}
                    transition={{ 
                        height : {duration: 0.3},
                        opacity : {delay: 0.1, duration : 0.3}
                    }}
                    className = "left-section-box-options"
                >
                    {options.map((name,key) => {
                        
                        return <LeftSectionBoxButton name={name} key={key} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}></LeftSectionBoxButton>
                    })}
                    
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>
}

function LeftSectionContent({leftSectionContentOpen, leftContentClosedOnce, selectedCourse, setSelectedCourse}) {
    return <>
        <AnimatePresence>
            {leftSectionContentOpen && (
                <motion.div
                    key="left-section"
                    id="left-section-content"
                    initial={leftContentClosedOnce ? { x : -23*window.innerWidth/100, opacity : 1} : false}
                    animate={{ x : 0, opacity : 1}}
                    transition={{ duration: 0.5}}
                    exit={{x : -23*window.innerWidth/100, opacity : 1}}
                >
                    <LeftSectionBox name={"Session actuelle"} options={["Calcul Différentiel", "Physique Mécanique", "Chimie Générale"]} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}></LeftSectionBox>
                    <LeftSectionBox name={"Tous les cours"} options={["Calcul Différentiel", "Physique Mécanique", "Chimie Générale","Calcul Intégral","Chimie des Solutions", "Électricité et Magnétisme", "Évolution et Diversité du Vivant"]} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}></LeftSectionBox>
                </motion.div>
            )}
        </AnimatePresence>
    </>
}

function VideoButton({name, selectedVideo, setSelectedVideo, furthestVideo, index}) {
    console.log(name);
    console.log(furthestVideo);
    let opacity = (furthestVideo - index - 1 > 0) ? "20%" : "100%";
    if (selectedVideo == name) {
        return <>
            <button className="video-button" style={{backgroundColor : "#EEEEEE"}} onClick={() => {setSelectedVideo(name)}}>
                { (furthestVideo - index - 1 >= 0) &&
                <FaCircle size={25} style={{marginRight : "8px"}} color={"#9B6EF7"} opacity={opacity}></FaCircle>}
                { (furthestVideo - index - 1 < 0) &&
                <GiCircle size={25} style={{marginRight : "8px"}} color={"#9B6EF7"} opacity="100%"></GiCircle>}
                {name}
            </button>
        </>
    }
    return <>
        <button className="video-button" onClick={() => {setSelectedVideo(name)}}>
            { (furthestVideo - index - 1 >= 0) &&
            <FaCircle size={25} style={{marginRight : "8px"}} color={"#9B6EF7"} opacity={opacity}></FaCircle>}
            { (furthestVideo - index - 1 < 0) &&
            <GiCircle size={25} style={{marginRight : "8px"}} color={"#9B6EF7"} opacity="100%"></GiCircle>}
            {name}
        </button>
    </>
}

function VideoChapter({nameChapter, videosArray, selectedVideo, setSelectedVideo, furthestVideo}) {
    const [videoChapterOpen, setVideoChapterOpen] = useState(false);
    return <>
        <div className="video-chapter">
            <button className="chapter-title" onClick={() => setVideoChapterOpen(!videoChapterOpen)}>
                <p className="chapter-name">{nameChapter}</p>
                {videoChapterOpen ?
                <FaChevronUp></FaChevronUp> :
                <FaChevronDown></FaChevronDown> 
            }
            </button>
            <AnimatePresence>
                {videoChapterOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0,
                        transition : {
                            opacity : {duration : 0.4},
                            height : {duration : 0.5}
                        }
                    }}
                    transition={{ 
                        height : {duration: 0.5},
                        opacity : {delay: 0.1, duration : 0.5}
                    }}
                    >
                    {videosArray.map((name,key) => {
                        return <React.Fragment key={key}>
                            {key > 0 && (<div className="video-separator">
                                <div className="video-separator-bar"></div>
                            </div>)}
                            <VideoButton index={key} name={name} selectedVideo = {selectedVideo} furthestVideo={furthestVideo} setSelectedVideo={setSelectedVideo}></VideoButton>
                        </React.Fragment>
                    })}
                </motion.div>
                )}
            </AnimatePresence>
            
        </div>
    </>
}

function ListVideos({contentArray, selectedVideo, setSelectedVideo, furthestVideo}) {
    let cumSizes = Array(contentArray.length+1).fill(0);
    for (let i = 1; i <= contentArray.length; i++) cumSizes[i] += cumSizes[i-1] + contentArray[i-1].length - 1;
    for (let i = 0; i <= contentArray.length; i++) console.log(cumSizes[i] + " ");
    return <>
        <div id="list-videos">
            {contentArray.map((list,key) => {
                return <React.Fragment key={key}>
                    <VideoChapter nameChapter={list[0]} videosArray={list.slice(1,list.length)} selectedVideo = {selectedVideo} furthestVideo={furthestVideo-cumSizes[key]} setSelectedVideo={setSelectedVideo}></VideoChapter>
                </React.Fragment>
            })}
        </div>
    </>
}

function LeftSection({selectedVideo, setSelectedVideo, furthestVideo, selectedCourse, setSelectedCourse}) {
    const [leftSectionContentOpen, setLeftSectionContentOpen] = useState(true);
    const [leftContentClosedOnce, setLeftContentClosedOnce] = useState(false);
    return <>
        <SideBar leftSectionContentOpen={leftSectionContentOpen} setLeftSectionContentOpen={setLeftSectionContentOpen} setLeftContentClosedOnce={setLeftContentClosedOnce}></SideBar>
        <ListVideos contentArray={[["Chapitre 1 : zizi", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Intro calcul diff", "Ma blonde a 14 ans", "J'ai chié par terre", "Je suis extrêmement raciste et mysogine, je souhaite la mort de tous sauf les hommes"],["Chapitre 2: Caca", "ouais", "bonjour", "alskdjf;laksdfj;lkj"]]} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} furthestVideo={furthestVideo}></ListVideos>
        <LeftSectionContent leftSectionContentOpen={leftSectionContentOpen} leftContentClosedOnce={leftContentClosedOnce} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}></LeftSectionContent>
    </>
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
            console.log("menuBarOpen = " + menuBarOpen)
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

function MiddleSection({video}) {

}

function Cours() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    return <>
        <div id="left-section">
            <LeftSection selectedVideo = {selectedVideo} setSelectedVideo={setSelectedVideo} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} furthestVideo = {24}></LeftSection>
        </div>
        <div id="middle-section">

        </div>
        <div id="right-section">

        </div>
    </>
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
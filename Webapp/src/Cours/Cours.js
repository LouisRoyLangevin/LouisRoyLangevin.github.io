import React, { Component } from 'react';
import { PiChartPieSliceDuotone } from "react-icons/pi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircle } from "react-icons/fa";
import { GiCircle } from "react-icons/gi";
import { useState, useEffect, useRef } from 'react';
import { TfiShiftLeft, TfiShiftRight } from "react-icons/tfi";
import { CiBookmark } from "react-icons/ci";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { HiMiniArrowTurnDownLeft, HiMiniArrowTurnDownRight } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import { LuPencil } from "react-icons/lu";

let nextId = 0;

// Left section
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
                    style={{overflow: "hidden"}}
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
        <div className="chapter">
            <button className="chapter-title" onClick={() => setVideoChapterOpen(!videoChapterOpen)}>
                <p className="chapter-name" style={{opacity : "0.8"}}>{nameChapter}</p>
                {videoChapterOpen ?
                <FaChevronDown></FaChevronDown> :
                <FaChevronUp></FaChevronUp> 
            }
            </button>
            <AnimatePresence>
                {videoChapterOpen && (
                <motion.div
                    style={{overflow : "hidden"}}
                    initial={{ opacity: 0.3, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0.3, height: 0,
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
        <ListVideos contentArray={[["Chapitre 1 : zizi", "Intro calcul diff", "Intro calcul diff", "Ma blonde a 14 ans", "J'ai chié par terre", "Je suis extrêmement raciste et mysogine, je souhaite la mort de tous sauf les hommes"],["Chapitre 2: Caca", "ouais", "bonjour", "alskdjf;laksdfj;lkj"]]} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} furthestVideo={furthestVideo}></ListVideos>
        <LeftSectionContent leftSectionContentOpen={leftSectionContentOpen} leftContentClosedOnce={leftContentClosedOnce} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}></LeftSectionContent>
    </>
}

// Middle section
function VideoContainer({selectedVideo}) {
    const [videoMinimized,setVideoMinimized] = useState(false);
    const [videoMinimizedOnce,setVideoMinimizedOnce] = useState(false);
    const [favorite, setFavorite] = useState(false);

    return <>
        <div id="video-container">
            <div id="video-header">
                <p id="video-title" style={{fontSize: "18px", margin : "15px", marginLeft : "0px"}}>Le titre de la video se trouve ici</p>
                <div id="video-header-icons">
                    <button id="video-favorite" onClick={() => setFavorite(!favorite)}>
                        {favorite ? <FaBookmark size={25}></FaBookmark>
                        : <FaRegBookmark size={25}></FaRegBookmark>}
                    </button>
                    <button id="video-minimizer" onClick={() => {setVideoMinimizedOnce(true); setVideoMinimized(!videoMinimized)}}>
                        {videoMinimized ? <GoChevronUp size={30}></GoChevronUp>
                        : <GoChevronDown size={30}></GoChevronDown>}
                    </button>
                </div>
            </div>
            <AnimatePresence>
            {!videoMinimized && (
                <motion.div
                    id="video"
                    initial={videoMinimizedOnce ? {height : 0} : false}
                    animate={{height : "auto"}}
                    transition={{ duration: 0.5}}
                    exit={{height : 0}}
                >
                    <iframe 
                        style={{width : "100%", aspectRatio : "16/9", borderRadius : "15px"}}
                        src="https://www.youtube.com/embed/Qskm9MTz2V4" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </motion.div>
            )}
        </AnimatePresence>
        </div>
    </>
}

function ChatBot({addPrompt, enter}) {
    const textareaRef = useRef(null);
    const chatBot = useRef(null);
    const adjustHeight = (e) => {
        const tmp = textareaRef.current;
        const chat = chatBot.current;
        const heightLimit = 100;
        if (tmp&&chat) {
            tmp.style.height = "auto";
            const sh = tmp.scrollHeight;
            if (sh >= heightLimit) {
                tmp.style.height = heightLimit + "px";
                tmp.style.overflowY = "scroll";
                chat.style.height = heightLimit + 18 + "px";
            }
            else {
                tmp.style.height = sh + "px";
                tmp.style.overflowY = "hidden";
                chat.style.height = sh + 18 + "px";

            }
        }
    }

    return <>
        <div id="chat-bot" ref={chatBot}>
            <textarea id="chat-bot-text-box" ref={textareaRef} rows={1} placeholder="Pose-moi une question sur ce sujet..." onInput ={adjustHeight}></textarea>
            <div id="chat-bot-enter" onClick={(e) => enter(e,textareaRef,adjustHeight)}>
                <HiMiniArrowTurnDownLeft size={18}></HiMiniArrowTurnDownLeft>
            </div>
        </div>
    </>
}

function ChatBotResponse({prompt, deletePrompt}) {
    const [contentOpen, setContentOpen] = useState(true);
    const [contentClosedOnce, setContentClosedOnce] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [textareaContent, setTextareaContent] = useState(prompt.content);
    
    const textareaRef = useRef(null);
    const adjustHeight = (e) => {
        console.log("asdfsaf")
        const tmp = textareaRef.current;
        if (tmp) {
            tmp.style.height = "auto";
            tmp.style.height = tmp.scrollHeight + "px";
            tmp.style.overflowY = "hidden";
        }
    }

    useEffect(() => {
        if (editMode) adjustHeight();
    }, [editMode])

    return <>
        <div className="response-container">
            <div className="response-header">
                <div className="response-header-left">
                    <HiMiniArrowTurnDownRight size={20}></HiMiniArrowTurnDownRight>
                    <p class="response-title">{prompt.title}</p>
                </div>
                <div className="response-header-right">
                    <button className="response-header-button" onClick = {deletePrompt}><HiOutlineTrash size={22}></HiOutlineTrash></button>
                    <button className="response-header-button" onClick = {() => {setEditMode(!editMode)}}><LuPencil size={20}></LuPencil></button>
                    <button className="response-header-button" onClick={() => {setContentClosedOnce(true); setContentOpen(!contentOpen)}}>
                        {contentOpen ? <GoChevronDown size={25}></GoChevronDown>
                        : <GoChevronUp size={25}></GoChevronUp>}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {contentOpen && (
                    <motion.div
                        className="response-content"
                        initial={contentClosedOnce ? {height : 0} : false}
                        animate={{height : "auto"}}
                        transition={{ duration: 0.5}}
                        exit={{height : 0}}
                    >
                        {editMode ? <textarea className="response-edit-mode"  ref={textareaRef} onInput={adjustHeight} onChange={(e) => setTextareaContent(e.target.value)} value={textareaContent}></textarea>
                        : <pre>{prompt.content}</pre>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>
}

function MiddleSection({selectedVideo}) {
    const [prompts, setPrompts] = useState([{id : 0, title : "Titre thaasdfasdft's what she said.", content: "zizizizizizizizizizii"},{id: 1, title : "Titre that's what she said.", content: "zizizizizizizizizizii"}]);
    function addPrompt(prompt) {
        setPrompts([...prompts,prompt]);
    }

    function deletePrompt(id) {
        setPrompts(prompts.filter(prompt => prompt.id != id))
    }
    
    function enter(e,textareaRef,adjustHeight) {
        let tmp = textareaRef.current.value;
        if (tmp.trim() == "") return;
        let newPrompt = {id: nextId++, title : "Bonjour", content : tmp};
        addPrompt(newPrompt)
        textareaRef.current.value = "";
        adjustHeight(e);
    }

    return <>
        <div id="middle-section-container">
            <VideoContainer></VideoContainer>
            <ChatBot addPrompt={addPrompt} enter={enter}></ChatBot>
            {prompts.map((prompt,key) => {
                return <>
                    <div className="response">
                        <ChatBotResponse prompt={prompt} deletePrompt={() => deletePrompt(prompt.id)} enter={enter}></ChatBotResponse>
                    </div>
                </>
            })}
            <div className="response-buffer"></div>
        </div>
    </>
}

// Right section
function Problem({problem}) {
    return <>
        <div className="problem-header">{problem.title}</div>
        <div className="problem-content">{problem.content}</div>
        <div className="problem-footer">
            <button className="answer">Answer</button>
        </div>
    </>
}

function RightSection({selectedVideo}) {
    const [optionSelected,setOptionSelected] = useState(0);
    return <>
        <div id="right-section-header">
            <button className="right-section-header-option" onClick={() => setOptionSelected(0)} style={(optionSelected == 0) ? {color : "black", paddingBottom : "3.5px", borderBottom : "solid black 2.5px"} : {}}>Exercices</button>
            <button className="right-section-header-option" onClick={() => setOptionSelected(1)} style={(optionSelected == 1) ? {color : "black", paddingBottom : "3.5px", borderBottom : "solid black 2.5px"} : {}}>Ressources</button>
        </div>
        <div id="right-section-content">
            {[{title : "Problème #1", content : "bonjour;alksdjf;lkasdfj"}].map((problem,key) => {
                return <>
                    <div className="problem">
                        <Problem problem={problem}></Problem>
                    </div>
                </>
            })}
        </div>
    </>
}

export default function Cours() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    return <>
        <div id="cours">
            <div id="left-section">
                <LeftSection selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} furthestVideo={24}></LeftSection>
            </div>
            <div id="middle-section">
                <MiddleSection selectedVideo={selectedVideo}></MiddleSection>
            </div>
            <div id="right-section">
                <RightSection selectedVideo={selectedVideo}></RightSection>
            </div>
        </div>
    </>
}
import React from 'react'
import { NavBar } from '../Dashboard/NavBar'
import Header from '../Dashboard/Header'
import { Resizable } from "re-resizable";

const resizableDivs = [
    { id: 1, width: 200, height: 200, content: "001" },
    { id: 2, width: 200, height: 200, content: "002" },
    { id: 3, width: 200, height: 200, content: "003" }
];

export const ResizeComponent = () => {
    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0",
        margin: "5px", // Added margin for spacing
        overflow: "hidden" // Hide overflow to prevent scrollbars
    };


    return (
        <>
            <Header />

            <div className="main-container">
                <NavBar />
                <div className="main">
                    <div className="report-container">
                        <div style={{ display: "flex", overflow: "hidden" }}>
                            {resizableDivs.map(({ id, width, height, content }) => (
                                <Resizable
                                    key={id}
                                    style={style}
                                    defaultSize={{
                                        width: width > 200 ? 200 : width, // Limit width to 200
                                        height: height > 200 ? 200 : height // Limit height to 200
                                    }}
                                >
                                    <div style={{ padding: "10px" }}>{content}</div>
                                </Resizable>
                            ))}
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

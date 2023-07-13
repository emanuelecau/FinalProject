import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export function Aboutus() {

    const [soci, setSoci] = useState([])

    useEffect(() => {
        async function getAllSoci() {
            const res = await axios.get("http://localhost:8000/Aboutus")
            setSoci(res.data)
        }
        getAllSoci()
    }, [])

    console.log(soci);

    return (
        <div className='page2'>

            <div style={{ backgroundColor: 'transparent', width: "100%", backdropFilter: "blur(10px)", borderBottom: "1px solid orange", padding: "10px" }}>
                <h1 style={{ backgroundColor: 'transparent', width: "100%", backdropFilter: "blur(10px)", color: "whitesmoke" }}>About Coco</h1>



            </div>
            <div style={{ display: "flex", justifyContent: "space-around", alignSelf: "center", justifySelf: "center" }}>
                <div className='first-about' style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                    <p style={{ textAlign: "left", flexWrap: "wrap", paddingRight: '300px', justifySelf: "flex-start", fontSize: "25px", backgroundColor: 'transparent', width: "100%", color: "var(--back1)" }}>Coco'comunity e' una giovane associazione no profit nata proprio all'alba di questa primavera dalle idee di Giacomo Cossu e Luca Sarais.  </p>
                    <img style={{ width: "500px", height: "500px", borderRadius: "50%", display: "flex", justifySelf: "start", alignSelf: "center", border: "5px dotted var(--back1)" }} src="https://img.freepik.com/premium-vector/chicken-logo-template-design-vector_20029-835.jpg" />
                    <p style={{ textAlign: "left", flexWrap: "wrap", paddingRight: '300px', fontSize: "25px", display: "flex", justifySelf: "flex-end", color: "var(--back1)" }}>I soci affiliati di Coco' occupano le varie sezioni di interesse a seconda di campo specifico e skill personali tutti con grande margine di decisione e spazio all' interno dell'associazione  </p>
                </div>


                <div className='soci'>
                    {soci.map(soci => (
                        <div className="flip-card">

                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img className='user' src={soci.img} />
                                    <h3 style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", alignSelf: "center", color: "var(--back1)" }} className="title">{soci.name} <em style={{ fontSize: "15px" }}>{soci.Surname}</em></h3>
                                    {/* <em>{soci.Surname}</em> */}
                                </div>
                                <div className="flip-card-back">
                                    <em style={{ textAlign: "center", display: "flex", alignContent: "center", justifyContent: "center", color: "orange", textShadow: ' 0 -1px 0 var(--write), 0 2px 0 var(--write)' }} className="title">{soci.role}</em>
                                    <em className='overflow'>{soci.story}</em>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div style={{ paddingTop: "35px", backgroundColor: 'transparent', width: "100%", backdropFilter: "blur(10px)", borderTop: "1px solid orange", padding: "10px", marginBottom: "30px", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <p style={{ marginTop: "150px", fontSize: "25px" }}>I Soci son parte fondamentale del progetto si collabora per gruppi</p>


                <h3 style={{ color: "whitesmoke", fontSize: "20px", borderBottom: "1px solid var(--write)", width: "20%", textAlign: "center", paddingBottom: "10px" }}> dove siamo ?</h3>

                <iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=9.062363505363466%2C40.92746863062284%2C9.071322083473207%2C40.930755555916285&amp;layer=cyclemap&amp;marker=40.92911211370786%2C9.066842794418335" style={{ border: "2px solid var(--write)", borderRadius: "50%", width: "400px", height: "400px" }}></iframe ><br /><small><a href="https://www.openstreetmap.org/?mlat=40.92911&amp;mlon=9.06684#map=18/40.92911/9.06684&amp;layers=CN">View Larger Map</a></small>

                <p style={{ fontSize: "25px" }}>ci trovi qua ad Aggius in via pentinei n 56</p>
            </div>

        </div >

    )
}

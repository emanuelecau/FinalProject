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

            <div className='header'>
                <h1>About Coco</h1>
            </div>

            <div className='content'>
                <div className='first-about'>
                    <p>Coco'comunity e' una giovane associazione no profit nata proprio all'alba di questa primavera dalle idee di Giacomo Cossu e Luca Sarais.</p>
                    <img className='profile-image' src="https://img.freepik.com/premium-vector/chicken-logo-template-design-vector_20029-835.jpg" />
                    <p>I soci affiliati di Coco' occupano le varie sezioni di interesse a seconda di campo specifico e skill personali tutti con grande margine di decisione e spazio all' interno dell'associazione.</p>
                </div>

                <div className='soci'>
                    {soci.map(soci => (
                        <div className="flip-card" key={soci.id}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img className='user' src={soci.img} />
                                    <h3 className="title">{soci.name} <em>{soci.Surname}</em></h3>
                                </div>
                                <div className="flip-card-back">
                                    <em className="title">{soci.role}</em>
                                    <em className='overflow'>{soci.story}</em>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='footer'>
                <p>I Soci son parte fondamentale del progetto si collabora per gruppi</p>
                <h3>dove siamo ?</h3>
                <iframe className="map" src="https://www.openstreetmap.org/export/embed.html?bbox=9.062363505363466%2C40.92746863062284%2C9.071322083473207%2C40.930755555916285&amp;layer=cyclemap&amp;marker=40.92911211370786%2C9.066842794418335"></iframe>
                <small><a href="https://www.openstreetmap.org/?mlat=40.92911&amp;mlon=9.06684#map=18/40.92911/9.06684&amp;layers=CN">View Larger Map</a></small>
                <p>ci trovi qua ad Aggius in via pentinei n 56</p>
            </div>

        </div>
    )
}

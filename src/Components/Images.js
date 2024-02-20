import React, { useState, useEffect } from 'react';
import { CCard, CCardBody } from "@coreui/react"
import "./images.css"
// import image1 from "../Assets/hero1.jpg";
// import image2 from "../Assets/hero2.jpg";
// import image3 from "../Assets/hero3.jpg";
// import image4 from "../Assets/hero4.jpg";
import { toast } from "react-toastify"
import axios from "axios"
import addIcon from "../Assets/AddIcon.png"
import { UploadImage } from "../Modal/UploadImages"
import { UPLOAD_IMAGES, GET_UPLOAD_IMAGES, BITBUCKET_URL } from "../Constant/Constant"

const Images = () => {

    const [fileObjects, setFileObjects] = useState([])
    const [uploadSucess, setUploadSuccess] = useState(false)
    const [images, setImages] = useState([
        // image1,
        // image2,
        // image3,
        // image4,
        // image1,
        // image2,
        // image3,
        // image4,
        // image1,
        // image2,
        // image3,
        // image4,

        // Add more image URLs as needed
    ]);

    const [show, setShow] = useState(false)

    useEffect(() => {
        getImages()
    }, [uploadSucess])


    const handleOnChange = (_files) => {
        console.log(_files, "filesss")
        setFileObjects(_files)
    }


    const getImages = async () => {
        try {
            await axios.get(`${GET_UPLOAD_IMAGES}?pageSize=${100}&page=${1}`)
                .then((res) => {
                    console.log(res.data, "dataaa")
                    setImages(res?.data?.data)
                })
                .catch((error) => {
                    console.log(error, "error")
                })
        } catch (error) {
            console.log(error, "error")

        }
    }

    const uploadImages = async (e) => {
        try {
            e.preventDefault()
            console.log(e.target.files, "filesssxx")

            if (fileObjects) {
                // return
                let formdata = new FormData();
                for (let file of fileObjects) {
                    console.log(file, "filefilemm")
                    formdata.append('upload_images', file)
                }

                await axios.post(`${UPLOAD_IMAGES}`, formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data; '
                    },
                })
                    .then((res) => {
                        console.log(res, "responsee=>>")

                        toast.success(res?.data?.message)
                        setShow(false)
                        setUploadSuccess(true)

                        // setImages(res.data?.data)
                    })
                    .catch((err) => {
                        console.log(err, "err=>>")
                        toast.error(err?.data?.message)


                    })

            }


        } catch (error) {
            console.log(error, "error")

        }
    }

    console.log(images, "images==mmmm")
    return (

        <div className="gallery-container">

            <UploadImage onSubmit={uploadImages} handleOnChange={handleOnChange} show={show} setShow={setShow} />
            <header className="header">Header Content</header>
            <aside className="left-menu">Left Menu Content</aside>
            <main className="main-content">
                <div className="image-gallery">
                    <CCard className="cardImage mb-0 mt-2">
                        <CCardBody className="browse_img">

                            <div className="horizontal-scroll">

                                <div className="itemGallery">
                                    <span className="position-absolute">
                                        <span className="testSpan"></span>
                                    </span>
                                    <label htmlFor={`check${"index"}`} className="upload_img mb-0 position-relative">
                                        <img
                                            onClick={() => setShow(true)}
                                            className="addImage"
                                            src={addIcon}
                                            // loading='lazy'
                                            alt=""
                                            style={{
                                                height: "-webkit-fill-available",
                                                /* width: "auto", */
                                                maxWidth: "86px",
                                                maxHeight: "71px",
                                                marginTop: "69px",
                                                marginLeft: "5px"
                                            }}
                                        />
                                    </label>

                                </div>

                                {images?.map((image, index) => (
                                    <div key={index} className="itemGallery">
                                        <span className="position-absolute">
                                            <span className="testSpan"></span>
                                            <img onClick={(e) => { }} className="crossImg" src={"cross"} alt="" />
                                        </span>
                                        <label htmlFor={`check${index}`} className="upload_img mb-0 position-relative">
                                            <img className="layerImg" src={`${BITBUCKET_URL}/${image.imageUrl}`} alt="" />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CCardBody>
                    </CCard>
                </div>
            </main>
            <footer className="footer">Footer Content</footer>
        </div>
    );
}

export { Images };

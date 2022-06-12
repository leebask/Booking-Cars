import React, { useRef, useState } from 'react'
import Menu from '../../header/Menu'
import HeaderHomeAccount from '../HeaderHomeAccount'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Modal } from '@mui/material';
import './CarTour.css'
import Mapbox from '../../mapbox';
import Footer from '../../footer/Footer';






function CarTour() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const a = useRef()

    const [open, setOpen] = React.useState(false);
    const [namePlace, setNamePlace] = useState("")
    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
        setNamePlace(a.current.outerText)
    }
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWith: 600,
        minHeight: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <>
                <HeaderHomeAccount
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
                {isMenuOpen && <Menu />}
            </>
            <div className="Card">
                <Card sx={{ maxWidth: 345 }} onClick={handleOpen} ref={a}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://cdn.baogiaothong.vn/files/dung.pham/2016/11/24/81-1604.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" >
                                Sài gòn - Đắk Lắk
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Từ 300.000 VND
                            </Typography>
                           
                        </CardContent>
                        
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }} onClick={handleOpen}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://vinhomecentralpark.com/wp-content/uploads/2021/06/Phoi-canh-Landmark-81-Vinhomes-Central-Park.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Đắk Lắk - Sài gòn
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Từ 250.000 VND
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {namePlace}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Mapbox />
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <Footer />
        </div>
    )
}

export default CarTour
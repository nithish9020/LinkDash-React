import React from 'react'
import './InfoLinks.css'
import { ImageOnly } from '../../Config/Logos';
import { Instagram,GitHub,LinkedIn,WhatsApp,Telegram,LocalPhone,YouTube,X } from '@mui/icons-material';

const LinkPutter = ({heading}) => {
    const contact = [
      { id: "Instagram", code:'r', link: "http://www.instagram.com/nithishh.in/", icon: <Instagram sx={{ fontSize: 50 }} />},
      { id: "GitHub", link: "https://github.com/nithish9020", icon: <GitHub sx={{ fontSize: 50 }} />},
      { id: "Whatsapp",code:'r', link: "https://github.com/nithish9020", icon: <WhatsApp sx={{ fontSize: 50 }} />},
      { id: "Linkedin", link: "https://github.com/nithish9020", icon: <LinkedIn sx={{ fontSize: 50 }} />},
      { id: "telegram", code:'r', link: "https://github.com/nithish9020", icon: <Telegram sx={{ fontSize: 50 }} />},
      { id: "phone", code:'r', link: "https://github.com/nithish9020", icon: <LocalPhone sx={{ fontSize: 50 }} />},
      { id: "youtube", link: "https://github.com/nithish9020", icon: <YouTube sx={{ fontSize: 50 }} />},
      { id: "x", link: "https://github.com/nithish9020", icon: <X sx={{ fontSize: 50 }} />},
      { id: "Linkedin", link: "https://github.com/nithish9020", icon: <X sx={{ fontSize: 50 }} />},
      { id: "Linkedin", link: "", icon: <LocalPhone sx={{ fontSize: 50 }} />},
    ];
    return (
    <div className='Contact-Container'>
        <h1>{heading}</h1>
        <div className='Contact-icon-Container'>
        {ImageOnly.map((c) => (
            <a href="" target="_blank" rel="noopener noreferrer">
               <img src={c} alt="social" style={{height:"50px",width:"50px"}}/>
            </a>
          ))}
        </div>
      </div>
  )
}

export default LinkPutter
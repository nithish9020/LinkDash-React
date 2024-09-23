import React from 'react'
import './InfoLinks.css'
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
        {contact.map((c) => (
            <a href={c.link} key={c.id} target="_blank" rel="noopener noreferrer">
               {c.icon}
            </a>
          ))}
        </div>
      </div>
  )
}

export default LinkPutter
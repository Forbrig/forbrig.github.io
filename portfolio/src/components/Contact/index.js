import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core/';
import { Person, Email, Facebook, Instagram, LinkedIn } from '@material-ui/icons/';

import './style.css';

function Contact() {
    return (
        <div id="contact">
            <div id="contact-grid">
                <TextField
                    className="name-field"
                    label="Name"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    className="email-field"
                    label="E-mail"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Message"
                    className="text-field"
                    multiline
                    rows="4"
                    variant="outlined"
                />
                <div id="media-field">
                    <IconButton aria-label="Facebook" target="_blank" href="https://www.facebook.com/vitor.forbrig">
                        <Facebook />
                    </IconButton>
                    <IconButton aria-label="Instagram" target="_blank" href="https://www.instagram.com/vitorforbrig/">
                        <Instagram />
                    </IconButton>
                    <IconButton aria-label="LinkedIn" target="_blank" href="https://www.linkedin.com/in/forbrig/">
                        <LinkedIn />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default Contact;

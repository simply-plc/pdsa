import {useState} from 'react';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import Divider from '@mui/material/Divider';



export default function CreateTeamDialog({open, setOpen, decodedToken}) {

    ///////////////
    // Conatiner //
    ///////////////

    const [validated, setValidated] = useState(false); // validate if submit button is clicked
    const [shareValidation, setShareValidation] = useState(false); // check for validation of adding members
    const [members, setMembers] = useState([decodedToken.email]); // This is a list of members
    const [formData, setFormData] = useState({ // This is to control the form input
        name: '',
        share: '',
    });


    // Close dialog
    function handleClose() {
        setOpen(false);
        // Reset everything
        setValidated(false);
        setMembers([decodedToken.email]);
        setFormData({
            name: '',
            share: '',
        });
    }

    // Handles the user input 
    function handleChange({target}) {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });

        // Resets validation
        setValidated(false);
        setShareValidation(false);
    }

    function handleSubmit(event) {
        // Prevent normal built in stuff
        event.preventDefault();
        event.stopPropagation();

        // Check if error
        if (isEmpty(formData.name, true)) {
            setValidated(true);
            return;
        }

        handleClose();
    }

    function handleAddMember() {
        // check if valid and add
        if (isInvalidEmail(true) || isExisting(true)) {
            setShareValidation(true);
        } else {
            // adds member
            setMembers(m => {
                m.unshift(formData.share);
                return m;
            });
            // resets the input
            setFormData({
                ...formData,
                share: '',
            });
        }
    }

    // This function simply checks if the email is a valid email format
    function isInvalidEmail(check=false) {
        // eslint-disable-next-line
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return (shareValidation || check) && !emailRegex.test(formData.share);
    }

    // Check if member already exists
    function isExisting(check=false) {
        return (shareValidation || check) && members.includes(formData.share);
    }

    // Submission //
    // Check if input is empty
    function isEmpty(text, check=false) {
        return (validated || check) && text === '';
    }

    ///////////////
    // Component //
    ///////////////


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                    sx: {
                        borderRadius:4
                    }
                }}
                >
                {/* Title */}
                <DialogTitle>Create Team</DialogTitle>
                {/* Content */}
                <DialogContent>
                    {/* Form content */}
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'center',
                            marginTop:'.4rem'
                        }}
                        >
                        {/* Inputs */}
                        <Stack spacing={2} sx={{width:'25rem'}}>
                            {/* Team Name */}
                            <TextField
                                label='Name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                helperText={
                                    (isEmpty(formData.name)) ? 'Name required' : ''
                                }
                                error={
                                    isEmpty(formData.name)
                                }
                                InputProps={{sx:{borderRadius:3}}}
                                />
                            {/* Add Members */}
                            <TextField
                                label='Add Member'
                                name='share'
                                value={formData.share}
                                onChange={handleChange}
                                helperText={
                                    (isInvalidEmail()) ? 'Invalid email' : 
                                    (isExisting()) ? 'Member already added' : ''
                                }
                                error={
                                    isInvalidEmail() ||
                                    isExisting()
                                }
                                InputProps={{
                                    sx:{
                                        borderRadius:3
                                    },
                                    endAdornment: (
                                        <IconButton
                                            color='primary'
                                            onClick={handleAddMember}
                                            >
                                            <PersonAddRoundedIcon />
                                        </IconButton>
                                    ),
                                }}
                                />
                            {/* List of members */}
                            <Box>
                                {/* Text */}
                                Members:
                                {/* scrollable List of members */}
                                <Box
                                    sx={{
                                        maxHeight:'8rem',
                                        overflow:'auto',
                                    }}
                                    >
                                    {
                                        members.map((v, i) => (
                                            <>
                                                <Divider sx={{
                                                    marginTop:'.5rem',
                                                    marginBottom:'.5rem',
                                                    }} 
                                                    />
                                                <Box
                                                    sx={{
                                                        paddingLeft:'1rem',
                                                        paddingRight:'1rem',
                                                        display:'flex',
                                                    }}
                                                    >
                                                    <Box>
                                                        {v}
                                                    </Box>
                                                    {/* Access Menu */}
                                                    {/*///////////////////////////////////////////////////////////////////*/}
                                                </Box>
                                            </>
                                        ))
                                    }
                                    {/* Ending divider */}
                                    <Divider sx={{
                                        marginTop:'.5rem',
                                        marginBottom:'.5rem',
                                        }} 
                                        />
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </DialogContent>
                {/* Buttons */}
                <DialogActions>
                    <Button 
                        color='secondary' 
                        variant='outlined' 
                        onClick={handleClose}
                        sx={{
                            borderRadius:4
                        }}
                        >
                        Cancel
                    </Button>
                    <Button 
                        variant='contained' 
                        type="submit" 
                        disableElevation 
                        sx={{
                            borderRadius:4
                        }}
                        >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
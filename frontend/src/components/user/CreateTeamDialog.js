import {useState, useEffect} from 'react';
import http from '../../http';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Avatar from '@mui/material/Avatar';





export default function CreateTeamDialog({open, setOpen, decodedToken, teams, setTeams}) {

    ///////////////
    // Conatiner //
    ///////////////

    const [validated, setValidated] = useState(false); // validate if submit button is clicked
    const [shareValidation, setShareValidation] = useState(false); // check for validation of adding members
    const [dne, setDne] = useState([]); // Users that don't exist when creating team
    const [members, setMembers] = useState([{ // This is a list of members
        user:decodedToken.email,
        is_admin:true,
        role:'owner',
    }]); 
    const [formData, setFormData] = useState({ // This is to control the form input
        name: '',
        share: '',
    });

    useEffect(() => {
        setMembers([{ // This is a list of members
            user:decodedToken.email,
            is_admin:true,
            role:'owner',
        }]);
    }, [decodedToken.user]);

    // Close dialog
    function handleClose() {
        setOpen(false);
        // Reset everything
        setDne([]);
        setValidated(false);
        setMembers([{ // This is a list of members
            user:decodedToken.email,
            is_admin:true,
            role:'owner',
        }]); 
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
        if (isEmpty(formData.name, true) || isNotMinimumMembers(true)) {
            setValidated(true);
            return;
        }

        const data = {
            name: formData.name,
            team_memberships: members,
        }

        // Post the data
        http.post('/api/team/create/', data,)
            .then(response => {
                setTeams([response.data, ...teams]); // Add the new teams to teams page (new team is hardcoded to be always last)
                handleClose();
            })
            .catch(error => {
                    if (error.response?.status === 400) { // User doesn't exist
                        let failedEmails = error.response.data.team_memberships.filter((v, i) => 'user' in v); // Get and filter users that got the error
                        // get the actual emails that failed
                        failedEmails = failedEmails.map((v, i) => {
                            return v.user[0].match(/Object with email=([^\s]+) does not exist./)[1];
                        });

                        // set them up so validation can be displayed
                        setDne(failedEmails);
                    } else {
                        alert(error.message); // Any other errors, alert
                    }
                }
            );

        
    }

    function handleAddMember() {
        // check if valid and add
        if (isInvalidEmail(true) || isExisting(true)) {
            setShareValidation(true);
        } else {
            // adds member
            setMembers(m => [
                {
                    user:formData.share,
                    is_admin:false,
                    role:'member',
                },
                ...m
            ]);

            // resets the input
            setFormData({
                ...formData,
                share: '',
            });
        }
    }

    // Adds member on hitting enter
    function handleAddMemberEnter(event) {
        if (event.key === "Enter") {
            // Stops default and propagation
            event.preventDefault();
            event.stopPropagation();
            // Adds member

            handleAddMember();
        }
    }

    function handleChangeAccess({target}) {
        // remove access if delete
        if (target.value === 'delete') {
            setMembers(m => {
                m.splice(target.name, 1);
                return [...m];
            });
        } else { // Else edit access
            setMembers(m => {
                const memberObj = m[target.name]
                memberObj.is_admin = target.value === 'admin';
                memberObj.role = target.value;
                return [...m];
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
        return (shareValidation || check) && members.filter((v, i) => v.user === formData.share).length > 0;
    }

    // Checks that at least one user is on the team
    function isNotMinimumMembers(check=false) {
        return (validated || check) && !(members.length > 0);
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
                        <Stack spacing={2} sx={{width:'30rem'}}>
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
                                onKeyDown={handleAddMemberEnter}
                                helperText={
                                    (isInvalidEmail()) ? 'Invalid email' : 
                                    (isExisting()) ? 'Member already added' : 
                                    (isNotMinimumMembers()) ? 'Need a minimum of one member' : ''
                                }
                                error={
                                    isInvalidEmail() ||
                                    isExisting() ||
                                    isNotMinimumMembers()
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
                                        maxHeight:'12rem',
                                        overflow:'auto',
                                    }}
                                    >
                                    {
                                        // members list
                                        members.map((v, i) => (
                                            <>
                                                {/* Divider */}
                                                <Divider sx={{
                                                    marginTop:'.5rem',
                                                    marginBottom:'.5rem',
                                                    }} 
                                                    />
                                                {/* Content */}
                                                <Box
                                                    sx={{
                                                        paddingLeft:'1rem',
                                                        paddingRight:'1rem',
                                                        display:'flex',
                                                        alignItems:'center',
                                                    }}
                                                    >
                                                    {/* Avatar */}
                                                    <Avatar
                                                        sx={{
                                                            marginRight:'1rem',
                                                            backgroundColor: 'primary.main',
                                                        }}
                                                        >
                                                        {v.user?.substring(0,2)}
                                                    </Avatar>
                                                    {/* Email */}
                                                    <Box sx={{flexGrow:1, overflow:'scroll'}}>
                                                        {v.user}
                                                    </Box>
                                                    {/* Error message */}
                                                    {(dne.includes(v.user)) ? 
                                                        <Box 
                                                            sx={{
                                                                color:'error.main',
                                                                marginRight:'1rem',
                                                                textAlign:'right',
                                                                minWidth:'6.5rem'
                                                            }}
                                                            >
                                                            User doesn't exist
                                                        </Box> : ''
                                                    }
                                                    {/* Access Menu */}
                                                    <Box>
                                                        <TextField
                                                            disabled={i === members.length-1}
                                                            select
                                                            name={i}
                                                            value={v.role}
                                                            size='small'
                                                            variant='outlined'
                                                            onChange={handleChangeAccess}
                                                            SelectProps={{
                                                                renderValue:select => select.charAt(0).toUpperCase() + select.slice(1),
                                                                MenuProps:{
                                                                    sx: {
                                                                        "&& .Mui-selected": {
                                                                            backgroundColor: "background.default"
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                            >
                                                            {/* Admin */}
                                                            <MenuItem disableGutters dense key='admin' value='admin' 
                                                                sx={{display:'flex', alignItems:'center'}}
                                                                >
                                                                {/* Icon */}
                                                                <Box
                                                                    sx={{
                                                                        display:'flex',
                                                                        width:'2.5rem',
                                                                        justifyContent:'center',
                                                                    }}
                                                                    >
                                                                    {v.role==='admin' && <CheckRoundedIcon 
                                                                        sx={{
                                                                            color:'primary.main',
                                                                        }} 
                                                                        />
                                                                    }
                                                                </Box>
                                                                {/* Word */}
                                                                <Box>Admin</Box>
                                                            </MenuItem>
                                                            {/* Member */}
                                                            <MenuItem disableGutters dense key='member' value='member' divider
                                                                sx={{display:'flex', alignItems:'center'}}
                                                                >
                                                                {/* Icon */}
                                                                <Box
                                                                    sx={{
                                                                        display:'flex',
                                                                        width:'2.5rem',
                                                                        justifyContent:'center',
                                                                    }}
                                                                    >
                                                                    {v.role==='member' && <CheckRoundedIcon 
                                                                        sx={{
                                                                            color:'primary.main',
                                                                        }} 
                                                                        />
                                                                    }
                                                                </Box>
                                                                {/* Word */}
                                                                <Box>Member</Box>
                                                            </MenuItem>
                                                            {/* Remove Access */}
                                                            <MenuItem dense key='delete' value='delete'>Remove Access</MenuItem>
                                                        </TextField>
                                                    </Box>
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
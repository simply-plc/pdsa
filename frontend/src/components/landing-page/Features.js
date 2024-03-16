import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';




export default function Features() {

    ///////////////
    // Container //
    ///////////////


    ///////////////
    // Component //
    ///////////////

    return (
        <>
            <Container 
                maxWidth='lg'
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    height:'100vh'
                }}
                >
                <Stack spacing={2}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={1000} height={40} />
                    <Skeleton variant="rectangular" width={1000} height={40} />
                    <Skeleton variant="rectangular" width={1000} height={40} />
                    <Skeleton variant="rectangular" width={1000} height={40} />
                    <Skeleton variant="rounded" width={1000} height={400} />
                </Stack>
            </Container>
        </>
    );
}
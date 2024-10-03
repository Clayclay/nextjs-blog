"use client";
import React, { useState, useCallback, useEffect } from "react";
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import Select from '@mui/material/Select';

//TODO Filter + connecter avec mes posts + mes categories
/*
change la presentation quand plus de contenu
*/


const cardData = [
    {
        img: 'https://picsum.photos/800/450?random=1',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        description:
            'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        authors: [
            { name: 'Remy Sharp', image: '/static/images/avatar/1.jpg' },
            { name: 'Travis Howard', image: '/static/images/avatar/2.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=2',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        description:
            'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        authors: [{ name: 'Erica Johns', image: '/static/images/avatar/6.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=3',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        description:
            'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        authors: [{ name: 'Kate Morrison', image: '/static/images/avatar/7.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=4',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        description:
            "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        authors: [{ name: 'Cindy Baker', image: '/static/images/avatar/3.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=45',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        description:
            "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        authors: [
            { name: 'Agnes Walker', image: '/static/images/avatar/4.jpg' },
            { name: 'Trevor Henderson', image: '/static/images/avatar/5.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=6',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        description:
            'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        authors: [{ name: 'Travis Howard', image: '/static/images/avatar/2.jpg' }],
    },
];

const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

function Author({ authors }) {
    console.log("authors", authors)
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <AvatarGroup max={3}>
                    {authors.map((author, index) => (
                        <Avatar
                            key={index}
                            alt={author.name}
                            src={author.image}
                            sx={{ width: 24, height: 24 }}
                        />
                    ))}
                </AvatarGroup>
                <Typography variant="caption">
                    {authors.map((author) => author.name).join(', ')}
                </Typography>
            </Box>
            <Typography variant="caption">July 14, 2021</Typography>
        </Box>
    );
}

Author.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export function Search() {
    return (
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Search…"
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
}

export function filterByCategory(mainPosts, categoriesFilter) {
    // const { categoriesFilter, mainPosts } = props;
    // console.log('inside function', typeof (categoriesFilter))

    if (categoriesFilter) {
        return mainPosts.filter(post => post.categories.name === categoriesFilter)//  mainPosts.filter(post => post.categories?.some(category => category?.name === categoryName))
    }
    return mainPosts
}


export default function MainContent(props) {

    /*Filtered  Categories*/
    const { categories, mainPosts } = props;
    const [categoriesFilter, setCategoriesFilter] = useState(null)
    const [filteredPosts, setFilteredPosts] = useState(mainPosts)


    useEffect(() => {
        setFilteredPosts(() => filterByCategory(mainPosts, categoriesFilter))
    }, [categoriesFilter]);

    const handleCategoriesClick = (event) => {
        console.info('You clicked the filter chip.', event.target.textContent);
        setCategoriesFilter(event.target.textContent)
        console.log('event', event)
    };

    const handleCategoriesReset = (event) => {
        setCategoriesFilter(null)
    };


    console.log('result filter', categoriesFilter,
        //filterByCategory(mainPosts, categoriesFilter)
        'Post 0', filteredPosts[0],
        //'allpost', filteredPosts
        //filteredPosts.map((element) => element)
    )
    /*Fin */


    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>


            <div>
                <Typography variant="h1" gutterBottom>
                    Blog
                </Typography>
                <Typography>Stay in the loop with the latest about our products</Typography>
            </div>
            <Box
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    flexDirection: 'row',
                    gap: 1,
                    width: { xs: '100%', md: 'fit-content' },
                    overflow: 'auto',
                }}
            >
                <Search />
                <IconButton size="small" aria-label="RSS feed">
                    <RssFeedRoundedIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'start', md: 'center' },
                    gap: 4,
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 3,
                        overflow: 'auto',
                    }}
                >
                    <Chip onClick={handleCategoriesReset} size="medium" label="All categories" />

                    {
                        categories.map(element => {
                            return (
                                < Chip
                                    key={element.id}
                                    onClick={handleCategoriesClick}
                                    size="medium"
                                    label={element.name}
                                    sx={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                    }}
                                />
                            )

                        })}

                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'row',
                        gap: 1,
                        width: { xs: '100%', md: 'fit-content' },
                        overflow: 'auto',
                    }}
                >
                    <Search />
                    <IconButton size="small" aria-label="RSS feed">
                        <RssFeedRoundedIcon />
                    </IconButton>
                </Box>
            </Box>


            <Grid container spacing={2} columns={12}>
                {/* DEBUT CARD */}

                {/*
                filteredPosts?.map((element) =>

                    < Grid size={{ xs: 12, md: 6 }}>
                        <SyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(0)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                        >
                            <CardMedia
                                component="img"
                                alt="post image"
                                image={"/uploads/" + element.image}
                                aspect-ratio="16 / 9"
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',

                                }}
                            />
                            <SyledCardContent>
                                <Typography gutterBottom variant="caption" component="div">
                                    {
                                        //  element.tag
                                    }
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {element.title}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {element.description}
                                </StyledTypography>
                            </SyledCardContent>
                            <Author authors={[element.author]} />


                        </SyledCard>
                    </Grid>

                )
                */}
                {/*  CARD */}

                <Grid size={{ xs: 12, md: 6 }}>
                    <SyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(0)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                    >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={filteredPosts[0].image}
                            aspect-ratio="16 / 9"
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        />
                        <SyledCardContent>
                            <Typography gutterBottom variant="caption" component="div">
                                {filteredPosts[0].tag}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {filteredPosts[0].title}
                            </Typography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                {filteredPosts[0].description}
                            </StyledTypography>
                        </SyledCardContent>
                        <Author authors={[filteredPosts[0].author]} />
                    </SyledCard>
                </Grid>
                {/* Fin CARD */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <SyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(1)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
                    >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={cardData[1].img}
                            aspect-ratio="16 / 9"
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        />
                        <SyledCardContent>
                            <Typography gutterBottom variant="caption" component="div">
                                {cardData[1].tag}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {cardData[1].title}
                            </Typography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                {cardData[1].description}
                            </StyledTypography>
                        </SyledCardContent>
                        <Author authors={cardData[1].authors} />
                    </SyledCard>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <SyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(2)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
                        sx={{ height: '100%' }}
                    >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={cardData[2].img}
                            sx={{
                                height: { sm: 'auto', md: '50%' },
                                aspectRatio: { sm: '16 / 9', md: '' },
                            }}
                        />
                        <SyledCardContent>
                            <Typography gutterBottom variant="caption" component="div">
                                {cardData[2].tag}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {cardData[2].title}
                            </Typography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                {cardData[2].description}
                            </StyledTypography>
                        </SyledCardContent>
                        <Author authors={cardData[2].authors} />
                    </SyledCard>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
                    >
                        <SyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(3)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
                            sx={{ height: '100%' }}
                        >
                            <SyledCardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                }}
                            >
                                <div>
                                    <Typography gutterBottom variant="caption" component="div">
                                        {cardData[3].tag}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {cardData[3].title}
                                    </Typography>
                                    <StyledTypography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {cardData[3].description}
                                    </StyledTypography>
                                </div>
                            </SyledCardContent>
                            <Author authors={cardData[3].authors} />
                        </SyledCard>
                        <SyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(4)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
                            sx={{ height: '100%' }}
                        >
                            <SyledCardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                }}
                            >
                                <div>
                                    <Typography gutterBottom variant="caption" component="div">
                                        {cardData[4].tag}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {cardData[4].title}
                                    </Typography>
                                    <StyledTypography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {cardData[4].description}
                                    </StyledTypography>
                                </div>
                            </SyledCardContent>
                            <Author authors={cardData[4].authors} />
                        </SyledCard>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <SyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(5)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
                        sx={{ height: '100%' }}
                    >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={cardData[5].img}
                            sx={{
                                height: { sm: 'auto', md: '50%' },
                                aspectRatio: { sm: '16 / 9', md: '' },
                            }}
                        />
                        <SyledCardContent>
                            <Typography gutterBottom variant="caption" component="div">
                                {cardData[5].tag}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {cardData[5].title}
                            </Typography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                {cardData[5].description}
                            </StyledTypography>
                        </SyledCardContent>
                        <Author authors={cardData[5].authors} />
                    </SyledCard>
                </Grid>
            </Grid>
        </Box >
    );
}
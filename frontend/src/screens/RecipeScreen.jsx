import { useParams } from 'react-router';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useSearchRecipeByIdQuery } from '../slices/usersApiSlice';
import Link from '@mui/material/Link';
import YouTubeIcon from '@mui/icons-material/YouTube';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RecipeScreen() {
  const [expanded, setExpanded] = React.useState(false);
  const { id } = useParams();
  const { data: recipe, isLoading, isSuccess, isFetching, isError } = useSearchRecipeByIdQuery(id);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (isLoading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Alert variant="filled" severity="error">
        Error loading recipe.
      </Alert>
    );

  console.log(recipe);
  return (
    <Stack sx={{ mt: 5 }} alignItems="center">
      <Card sx={{ maxWidth: 600 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={recipe.name}
          subheader={recipe.catagory + ', ' + recipe.cuisine}
        />
        <CardMedia component="img" height="194" image={recipe.picutre} alt="Paella dish" />
        <CardContent>
          <Link href={recipe.youtubeLink} target="_blank" rel="noopener">
            <YouTubeIcon></YouTubeIcon>
          </Link>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup
            of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {recipe.ingredients.map((el, idx) => (
              <Typography key={idx} paragraph>
                {el}
              </Typography>
            ))}

            {recipe.instructions.map((el, idx) => (
              <Typography key={idx} paragraph>
                {el}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </Stack>
  );
}

export default RecipeScreen;

import Carousel from '../components/Carousel.jsx';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const HomeScreen = () => {
  // dummy menu to load on screen before recipes are populated
  // const recipeOptions = [
  //   //dummy data
  //   { idMeal: 1, strMeal: 'Pizza' },
  //   { idMeal: 2, strMeal: 'Spaghetti' },
  //   { idMeal: 3, strMeal: 'Mac and Cheese' },
  //   { idMeal: 4, strMeal: 'egg' },
  // ];

  //mealNames is going to be an array of the options in the autocomplete/dropdown menu
  // const mealNames = recipeOptions.map((option) => option.strMeal);

  // console.log('The search term is: ', searchTerm);
  // const recipeObj = recipeOptions.find(
  //   (element) =>
  //     //should try inserting conditional if searchTerm is null
  //     element.strMeal === searchTerm
  // );

  // console.log('The recipe object is: ', recipeObj);

  const images = [
    // chicken dish
    'https://i.pinimg.com/736x/ee/99/46/ee99461ba45e220b0598b36428679271.jpg',
    // pasta dish
    'https://www.boozyburbs.com/wp-content/uploads/2022/10/nisi_taverna-650x350.jpg',
    // pizza dish
    'https://www.boozyburbs.com/wp-content/uploads/2020/09/razza_0343-650x350.jpg',
    // cheeseburger dish
    'https://images.hive.blog/0x0/https://steemitimages.com/DQmZP6BQUD6w64FUipUwafS61xDoBuGefvQVX7dLQGK6uvS/burger.jpg',
  ];

  return (
    <Stack alignItems="center" sx={{ mt: 5 }}>
      <Typography variant="h2">Welcome to RecipEase!</Typography>
      <Carousel images={images} />
    </Stack>
  );
};

export default HomeScreen;

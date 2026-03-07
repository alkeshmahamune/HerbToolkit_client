import indian from '../assets/indian.jpg'
import italian from '../assets/italian.jpg'
import asian from '../assets/asian.jpg'
import chinese from '../assets/chinese.jpg'
import continental from '../assets/continental.jpg'
import japanese from '../assets/japanese.jpg'
import korean from '../assets/korean.jpg'
import mexican from '../assets/mexican.jpg'
import spaghetti from '../assets/pastaspaghetti.jpg'
import biryani from "../assets/biryani.jpg"

export const data=[
    {id:1, cover:indian, heading:"Indian"},
    {id:2, cover:italian, heading:"Italian"},
    {id:3, cover:asian, heading:"Asian"},
    {id:4, cover:chinese, heading:'Chinese'},
    {id:5, cover:continental, heading:'Continental'},
    {id:6, cover:japanese, heading:'Japanese'},
    {id:7, cover:korean, heading:'Korean'},
    {id:8, cover:mexican, heading:'Mexican'},
]

export const recipes = [
    {
      name: "Spaghetti Pasta",
      category: "Italian",
      image: spaghetti,
    },
    {
      name: "Veg Biryani",
      category: "Indian",
      image: biryani,
    },
    {
      name: "Sushi Roll",
      category: "Japanese",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    },
    {
      name: "Tacos",
      category: "Mexican",
      image: mexican,
    },
  ];
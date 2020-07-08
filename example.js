var animals =[
    { name: "A", species: 'rabbit'},
    { name: "B", species: 'dog'},
    { name: "C", species: 'dog'},
    { name: "D", species: 'cat'},
    { name: "E", species: 'fish'}
]

var isDog = function(animal){
    return animal.species === 'dog'
}

var dogs = animals.filter(isDog)
var otherAnimals = animals.reject(isDog)

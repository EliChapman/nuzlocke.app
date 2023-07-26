export const types = [
  'normal', 'fire', 'water',
  'grass', 'electric', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'fairy', 'steel',
  'dragon', 'dark', 'ghost', 'rock', 'psychic', 'bug', '???', 'crystal'
]

const nonCanonTypes = ['???', 'crystal']
export const canonTypes = types.filter(i => !nonCanonTypes.includes(i))

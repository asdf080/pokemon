const base = "https://pokeapi.co/api/v2/";

export async function apiGetPokes({ endpoint }) {
  try {
    return await fetch(base + endpoint).then((res) => res.json());
  } catch (error) {}
}

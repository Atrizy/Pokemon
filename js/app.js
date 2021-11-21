{/* <section id="test_card">
<h3>Test</h3>
<img src="" alt=""/>
<h4>Test Health</h4>
<p>desc</p>
<div class="moves">
  <h4>Test Move</h4>
  <h4>Test Move</h4>
  <h4>Test Move</h4>
  <h4>Test Move</h4>
</div> */}

function store_pkmn_cookie(pkmn_json) {
    var user_pkmn = JSON.parse(pkmn_json);
    var game_state = {
        user_max_hp: 50,
        user_current_hp: 50,
        cpu_max_hp: 40,
        cpu_current_hp: 40,
        user_selection: user_pkmn,
        cpu_selection: pkmn[1],
        user_atk: pkmn.moves_dmg
    }
    game_state_json = JSON.stringify(game_state);
    Cookies.set("game_state", game_state_json);
    window.location = "/pages/battle.html"
}

function selected_pkmn(pkmn) {
    var chosen_pkmn = document.getElementById("pkmn_selection");

    var pkmn_selector = document.createElement("article");
    pkmn_selector.classList.add("pkmn_container");
    pkmn_selector.setAttribute(`onclick`, `store_pkmn_cookie('${JSON.stringify(pkmn)}')`);

    var pkmn_img = document.createElement("img");
    pkmn_img.src = pkmn.img_src

    var pkmn_name = document.createElement("h3");
    pkmn_name.innerText = pkmn.name;

    var pkmn_health = document.createElement("h4");
    pkmn_health.innerText = "Health: " + pkmn.health;

    var pkmn_desc = document.createElement("p");
    pkmn_desc.innerText = pkmn.desc;

    var pkmn_moves = document.createElement("div")
    pkmn_moves.classList.add("moves")
    for(var i=0; i < pkmn.moves.length; i++){
        var grabbed_moves = document.createElement("h4");
        grabbed_moves.innerText = pkmn.moves[i];
        pkmn_moves.appendChild(grabbed_moves);
    }

    pkmn_selector.appendChild(pkmn_name);
    pkmn_selector.appendChild(pkmn_img);
    pkmn_selector.appendChild(pkmn_health);
    pkmn_selector.appendChild(pkmn_desc)
    pkmn_selector.appendChild(pkmn_moves)

    chosen_pkmn.appendChild(pkmn_selector)
}

var pkmn = [
    {
        name: "Meganium",
        desc: "The fragrance of Meganium’s flower soothes and calms emotions. In battle, this Pokémon gives off more of its becalming scent to blunt the foe’s fighting spirit.",
        img_src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/154.png",
        health: 45,
        moves: ["Razor Leaf ", " Pettle Blizzard" , " Magical Leaf" , " Solar Beam"],
        moves_dmg: [2,3,5,9]
    },
    {
        name: "Ampharos",
        desc: "The light from its tail can be seen from space. This is why you can always tell exactly where it is, which is why it usually keeps the light off.",
        img_src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/181.png",
        health: 50,
        moves: ["Dragon Pulse ", " Fire Punch" , " Thunder Punch" , " Zap Cannon"],
        moves_dmg: [4,2,7,3]
    },
    {
        name: "Gengar",
        desc: "On the night of a full moon, if shadows move on their own and laugh, it must be Gengar’s doing.",
        img_src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png",
        health: 45,
        moves: ["Hypnosis ", " Dream Eater" , " Shadow Punch" , " Shadow Ball"],
        moves_dmg: [4,5,1,3]
    },
    {
        name: "Hitmonchan",
        desc: "Its punches slice the air. They are launched at such high speed, even a slight graze could cause a burn.",
        img_src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/107.png",
        health: 45,
        moves: ["Drain Punch ", " Close Combat" , " Focus Punch" , " Focus Blast"],
        moves_dmg: [4,4,11,2]
    }
] 

for(var i=0; i < pkmn.length; i++){
    selected_pkmn(pkmn[i]);
}

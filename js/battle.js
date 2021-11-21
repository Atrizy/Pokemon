{/* 
    <div class="user_hp"></div>
    <img src="" alt="" />
    <div class="user_moves">
        <button>Attack 1</button>
    </div> 

*/}

function inject_user_pkmn() {
    var container = document.getElementById("user_pkmn_container");

    var game_state_json = Cookies.get("game_state");
    var game_state = JSON.parse(game_state_json);

    var user_pkmn = game_state["user_selection"]

    var user_hp = document.createElement("div")
    user_hp.classList.add("user_hp");
    var hp_text = document.createElement("p");
    hp_text.innerText = `${game_state.user_current_hp} / ${game_state.user_max_hp}`
    
    var user_img = document.createElement("img");
    user_img.src = user_pkmn.img_src;
    user_img.classList.add("user_img");

    var user_moves = document.createElement("div");
    user_moves.classList.add("user_moves");


    
    for(var i=0; i < game_state.user_selection.moves.length; i++) {
        var moves_grabbed = document.createElement("button");
        moves_grabbed.setAttribute("damage", game_state.user_selection.moves_dmg[i])
        moves_grabbed.addEventListener("click", start_turn);
        moves_grabbed.innerText = game_state.user_selection.moves[i];
        user_moves.appendChild(moves_grabbed);
    }


    user_hp.appendChild(hp_text);

    container.appendChild(user_hp);
    container.appendChild(user_img);
    container.appendChild(user_moves);
}

function inject_cpu_pkmn() {
    var container = document.getElementById("cpu_pkmn_container")

    var game_state_json = Cookies.get("game_state");
    var game_state = JSON.parse(game_state_json);
    var cpu_pkmn = game_state["cpu_selection"]

    var cpu_hp = document.createElement("div");
    cpu_hp.classList.add("cpu_hp");
    var hp_text = document.createElement("p");
    hp_text.innerText = `${game_state.cpu_current_hp} / ${game_state.cpu_max_hp}`;

    var cpu_img = document.createElement("img");
    cpu_img.src = cpu_pkmn["img_src"];
    cpu_img.classList.add("cpu_img");
   
    cpu_hp.appendChild(hp_text);

    container.appendChild(cpu_hp);
    container.appendChild(cpu_img);

}

function start_turn() {
    var game_state_json = Cookies.get("game_state")
    var game_state = JSON.parse(game_state_json)

    var button_damage = this.getAttribute("damage")
    game_state.cpu_current_hp = game_state.cpu_current_hp -button_damage;
    var cpu_hp_text = document.querySelector(".cpu_hp p")
    cpu_hp_text.innerText = `${game_state.cpu_current_hp} / ${game_state.cpu_max_hp}`

    if(game_state.cpu_current_hp <=0) {
            declare_winner("You Won!");
    } else {
        game_state.user_current_hp = game_state.user_current_hp -3;
    var user_hp_text = document.querySelector(".user_hp p");
    user_hp_text.innerText = `${game_state.user_current_hp} / ${game_state.user_max_hp}`;
        if(game_state.user_current_hp <=0) {
            declare_winner("You Lose!");
        }
    }

    game_state_json = JSON.stringify(game_state);
    Cookies.set("game_state", game_state_json);
}

function declare_winner(message) {
    var game_status = document.getElementById("game_status")
    game_status.innerText = message;
    var user_moves_div = document.querySelector(".user_moves");
    user_moves_div.style.display = "none"
}

inject_user_pkmn();
inject_cpu_pkmn();
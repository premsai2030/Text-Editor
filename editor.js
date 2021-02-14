// Intializing the post variable 
let post = "";
document.getElementById("write_part").value = post;

// Feching the data from the textarea box and placing in preview block.
function get_write() {
    if (document.getElementById("write_part").value.trim().length == 0) {
        post = localStorage.getItem("write_post");
        document.getElementById("write_part").value = post;
    } else post = document.getElementById("write_part").value;
    //console.log(document.getElementById("write_part").value.trim().length) ;
    localStorage.setItem("write_post", post);
    change_to_code(post.split("\n"))
    document.getElementById("see_preview").innerHTML = get_final_code();

}

// Calling the get_write function every second. 
let call = setInterval(get_write, 2000);

let final_list = [];

function change_to_code(get_post_as_array) {
    let _list = [];
    for (let i = 0; i < get_post_as_array.length; i++) {
        let first_word = "";
        for (let j = 0; j < get_post_as_array[i].length; j++) {
            if (get_post_as_array[i][j] == " ") break;
            else first_word += get_post_as_array[i][j];
        }
        if (first_word == "") {
            _list[_list.length - 1] += "<br>";
        }
        if (check_html_codes(first_word) == -1) {
            _list[_list.length - 1] += " " + get_post_as_array[i];
            //console.log(first_word) ;
        } else {
            _list.push(get_post_as_array[i]);

        }

    }

    final_list = _list;
    //console.log(final_list) ;
}

function check_html_codes(get_html_codes) {
    let html_codes = ["cen", "h1", "h2", "h3", "h4", "h5", "h6", "p"];
    let list_html_codes = get_html_codes.split(",");
    for (let i = 0; i < list_html_codes.length; i++) {
        if (html_codes.indexOf(list_html_codes[i]) == -1) return -1;
    }

}

function get_final_code() {
    let html_codes = ["cen", "h1", "h2", "h3", "h4", "h5", "h6", "p"];
    let original_html_codes = ["center", "h1", "h2", "h3", "h4", "h5", "h6", "p"];
    let final = "";
    for (let j = 0; j < final_list.length; j++) {
        let first_word = "";
        let remained_word = "";
        let i = 0;
        for (i; i < final_list[j].length; i++) {
            if (final_list[j][i] == " ") break;
            else first_word += final_list[j][i];
        }
        for (i; i < final_list[j].length; i++) {
            remained_word += final_list[j][i];
        }
        var res = first_word.split(",");
        s1 = "";
        s2 = "";
        for (let i = 0; i < res.length; i++) {
            s1 += "<" + original_html_codes[html_codes.indexOf(res[i])] + ">";
            s2 = "</" + original_html_codes[html_codes.indexOf(res[i])] + ">" + s2;
        }
        final += s1 + remained_word + s2;
    }
    return final;
}


function clear_data() {
    clearInterval(call);
    localStorage.removeItem("write_post");
    return true;
}
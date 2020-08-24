// WORLD CONFIGS :

    // size of the world:
    const x_count = 20;
    const y_count = 20;

    // Speed of the refresh-rate (in seconds):
    const refresh_every = 1 // second

    //Count of live cells in the beginig:
    const based_on_chance = true;
    const living_probabality_for_each_cell = 1/3;// works if based-on-chance is true


    const position_of_live_cells = [ [1,2],[2,3],[3,1], [3,2],[3,3] ]; 
        // |__ works if based-on-chance is false
        // |__ position determination structure :  [x,y] ( both x and y start with 0 )

// END OF CONFIGS




var matrix = [];

if(based_on_chance){


    // randomizing the matrix:
    const prob = living_probabality_for_each_cell;
    for(i=0;i<y_count;i++){
        matrix.push([]);
    }
    matrix.forEach((v, i)=>{
        for(e=0;e<x_count;e++){
            matrix[i].push( Math.random() > prob ? 0 : 1 );
        }
    })

}else{
    // determining the position of live cells
    //  (if based-on-chance is false)

    
    // creating empty canvas :
    for(y=0;y<y_count;y++){
        matrix.push([]);
        for(x=0;x<x_count;x++){
            matrix[y].push(0);
        }
    }
    
    // positioning the cells:
    const pos = position_of_live_cells;
    pos.forEach((v, i)=>{
        //if(matrix[ v[1] ][ v[0] ]){
            matrix[ v[1] ][ v[0] ] = 1;
        //}
    });
}

// drawing matrix:
function draw(){
    console.clear();
    var resault = [];
    matrix.forEach((v, i)=>{
        resault.push( matrix[i].join(" ") );
    })
    var output = resault.join("\n").replace(/1/g, "X")
    output = resault.join("\n").replace(/0/g, ".")
    // console.log(resault.join("\n"));
    console.log(output);
}



// updating matrix:
function sum(x,y){
    var neighbour_sum = 0;
    //  !! x and y start with 0 !!
    neighbour_sum += x-1 >= 0 ? matrix[y][x-1] : 0;
    neighbour_sum += x+1 <= x_count-1 ? matrix[y][x+1] : 0;

    neighbour_sum += y-1 >= 0 ? matrix[y-1][x] : 0;
    neighbour_sum += y+1 <= y_count-1 ? matrix[y+1][x] : 0;

    neighbour_sum += x-1 >= 0 && y-1 >= 0 ? matrix[y-1][x-1] : 0;
    neighbour_sum += x-1 >= 0 && y+1 <= y_count-1 ? matrix[y+1][x-1] : 0;
    neighbour_sum += x+1 <= x_count-1 && y-1 >= 0 ? matrix[y-1][x+1] : 0;
    neighbour_sum += x+1 <= x_count-1 && y+1 <= y_count-1 ? matrix[y+1][x+1] : 0;

    return neighbour_sum
}

function update(){
    var cur_resault = [];
    matrix.forEach((v, i)=>{
        cur_resault.push([]);
        v.forEach(()=>{
            cur_resault[i].push(0);
        })
    })

    cur_resault.forEach((v_y, i_y)=>{
        v_y.forEach((v_x, i_x)=>{
            const s = sum(i_x,i_y);
            if(s == 3){
            cur_resault[i_y][i_x] = 1;
            } else if(s == 2 || s==3){
                cur_resault[i_y][i_x] = matrix[i_y][i_x];
            }else if(s > 3 || s < 2){
                cur_resault[i_y][i_x] = 0;
            }
        })
    })
    
    matrix = cur_resault;

}


setInterval(()=>{
    draw();
    update();
}, refresh_every*1000);

// console.log( sum(2,1) );




export default function badForm({ax, ay, az, gx, gy, gz, exercise}){
    switch(exercise){
        case "bicep":
            if(gz < -50 || gz > 50 || // if doing workout too fast
                gx < -50 || gx > 50 ||
                gy < -150 || gy > 150 ||
                ay < -0.5 || ay > 0.5 || // if arm is leaning too much
                az > 0
                ){
                return false
            }
            break
        case "jack":
            if(gx < -200 || gx > 200 || // if going too fast
                gy < -200 || gy > 200||
                gz < -300 || gz > 300 ||
                az < -0.5 || az > 0.5 || // if bad form
                ay < 0
                ){
                return false
            }
            break
        case "lateral":
            if(gx < -100 || gx > 100 || // if going too fast
                gy < -300 || gy > 300||
                gz < -100 || gz > 100 ||
                az < 0 || // if bad form
                ay < -0.5 || ay > 0.5 ||
                ax < 0
                ){
                return false
            }
            break
    }
    return true
}



export default function badForm({ax, ay, az, gx, gy, gz, exercise}){
    switch(exercise){
        case "bicep":
            // if(gz < -50 || gz > 50 || // if doing workout too fast
            //     gx < -50 || gx > 50 ||
            //     gy < -150 || gy > 150 ||
            //     ay < -0.5 || ay > 0.5 || // if arm is leaning too much
            //     az > 0
            //     ){
            //     return "slowdown"
            // }
            
            if (ay < -0.5 || ay > 0.5 || az > 0) 
                return "bad form"

            if (gz < -50 || gz > 50 || // if doing workout too fast
                gx < -50 || gx > 50 ||
                gy < -150 || gy > 150) {
                return "slowdown"
            }

            break

        case "lateral":
            if(ax > 0.6 || // could be cut
                ay < -0.4 || ay > 0.1 ||
                az > 0.1){
                return "bad form"
            }

            if(gx < -60 || gx > 60 ||
                gy < -100 || gy > 100 ||
                gz < -50 || gz > 50){
                return "slowdown"
            }

            break

        case "row":
            if(ax > -0.9 || // could be cut
                ay < -0.4 || ay > 0.1 || 
                az < -0.2 || az > 0.6){
                return "bad form"
            }

            if(gx < -15 || gx > 15 ||
                gy < -40 || gy > 40 ||
                gz < -50 || gz > 50){
                return "slowdown"
            }

            break

        case "jack":
            if(az < -1 || az > 1 || // if bad form
                ay < -0.2){
                return "bad form"
            }
            
            if(gx < -300 || gx > 300 || // if going too fast
                gy < -200 || gy > 200||
                gz < -500 || gz > 500){
                return "slowdown"
            }
            break

        case "crunch":
            if(ax < -0.7 || ax > 0.1 ||
                ay < 0.7 || 
                az < -0.3 || az > 0.6){
                return "bad form"
            }
            
            if(gx < -60 || gx > 60 ||
                gy < -100 || gy > 100 ||
                gz < -50 || gz > 50){
                return "slowdown"
            }
            break

        case "push":
            if(ax < -0.2 || ax > 0.3 ||
                ay < -0.4 || ay > 0.1 || 
                az > -0.8){
                return "bad form"
            }
            
            if(gx < -20 || gx > 20 ||
                gy < -30 || gy > 30 ||
                gz < -10 || gz > 10){
                return "slowdown"
            }
            break

        
    }
    return null
}


/*----------------------------------COLOR CALIBRATION ------------------------------------ */

function colorCalibration_CatConflict_Booth7() {



/*----------------------------------Part 2: ENTER DESIRED COLOR COORDINATES IN xyY ------------------------------------ */

// BOOTH 7 -----------------------------------------------------------------
//Calibration date: 


/*----------------------------------Part 1: PUT IN YOUR MONITOR-SPECIFIC VALUES IN THE FOLLOWING SECTION------------------------------------ */
//the constant and slope was taken from the linear equation fit to log luminance as a function of log voltage 

constantR = 1.7185
slopeR =  0.4029

constantG = 1.4959
slopeG = 0.3987

constantB = 1.8874
slopeB = 0.412

//Monitor gun chromaticiites (x and y are from CIE 1931 xyY space)
xR  = 0.642
yR  = 0.347  

xG = 0.322
yG = 0.600  

xB = 0.140
yB = 0.068  




/*----------------------------------Part 2: ENTER DESIRED COLOR COORDINATES IN xyY ------------------------------------ */

numColors = 28 //currently includes background color - as last color, 

//x coordinates
set_xorig =[
        0.2129,
      0.2100,
    0.2073,
    0.2048,
    0.2025,
    0.2005,
    0.1987,
    0.1972,
    0.1959,
    0.1950,
    0.1944,
    0.1941,
    0.1942,
    0.1948,
    0.1957,
    0.1977,
    0.2171,
    0.2316,
    0.2425,
    0.2509,
    0.2576,
    0.2630,
    0.2675,
    0.2712,
  
0.3101,//white 
0.3101,//light grey,
0.3101,//dark gray
0.3101//background color
]  

//here is where you can update/adjust the values for x
set_xadj =  new Array(numColors).fill(0)

set_xadj[13] = -.012
set_xadj[14] = -.016
set_xadj[15] = -.014
set_xadj[16] = -.012
set_xadj[17] = -.012



//y coordinates
set_yorig = [
        0.2467,
      0.2394,
    0.2321,
    0.2245,
    0.2168,
    0.2088,
    0.2006,
    0.1921,
    0.1832,
    0.1738,
    0.1637,
    0.1529,
    0.1410,
    0.1277,
    0.1125,
    0.0926,
    0.1206,
    0.1419,
    0.1594,
    0.1740,
    0.1863,
    0.1967,
    0.2056,
    0.2133,

  
0.3162,//white
0.3162,//light grey
0.3162, //dar gray
0.3162//background
            ]

//here is where you can update/adjust the values for y
set_yadj = new Array(numColors).fill(0)

set_yadj[7] = -.01
set_yadj[8] = -.015
set_yadj[9] = -.016
set_yadj[10] = -.016
set_yadj[11] = -.016
set_yadj[12] = -.02
set_yadj[13] = -.025
set_yadj[14] = -.035
set_yadj[15] = -.035
set_yadj[16] = -.03
set_yadj[17] = -.02
set_yadj[18] = -.02
set_yadj[19] = -.015
set_yadj[20] = -.01
set_yadj[21] = -.01
set_yadj[22] = -.01
set_yadj[23] = -.012
set_yadj[26] = -.01

//Array used to specify lightness (CIE Y * 116, which is the maximum cd/m2 for our monitor)
set_Yorig = [
       58.6610,
       50.0467,
   42.3199,
   35.4324,
   29.3359,
   23.9822,
   19.3230,
   15.3100,
   11.8951,
    9.0300,
    6.6664,
    4.7560,
    3.2506,
    2.1021,
    1.2620,
    0.6642,
    1.3938,
    2.4810,
    4.0234,
    6.1006,
    8.7922,
   12.1777,
   16.3369,
   21.3492,


  
100, //white
50,//light grey
5, //dark gray 
30 //19.26 //background
]


//here is where you can update/adjust the values for Y
set_Yadj = new Array(numColors).fill(0)

//set_Yadj[1] = -2
//set_Yadj[2] = -2
set_Yadj[0]=-1
set_Yadj[1]=-.8
set_Yadj[3]=-1.2
set_Yadj[4]=-1.2
set_Yadj[5]=-1.2
set_Yadj[7]=-1.2
set_Yadj[8]=-1.2
set_Yadj[9]=-0.6
//set_Yadj[15]=-0.55
set_Yadj[22]=-1.3
set_Yadj[23]=-1.2
set_Yadj[24]=-1
set_Yadj[25]=-.8
set_Yadj[27]=-1.2

//Do not change after this
var set_x = []
var set_y = []
var set_Y = []
for(var j = 0; j < numColors; j++) {
    set_x.push(set_xorig[j] + set_xadj[j])
    set_y.push(set_yorig[j] + set_yadj[j])
    set_Y.push(set_Yorig[j] + set_Yadj[j])
}

console.log(set_Y)

var Rval = new Array(numColors).fill(0)
var Gval = new Array(numColors).fill(0)
var Bval = new Array(numColors).fill(0)



/*----------------------------------Part 3: ACQUIRE RGB COORDINATES FOR YOUR MONITOR ------------------------------------ */

//Turns the xyY values into RGB values and stors them in Rval, Gval and Bval

var colors = new Array


for (var i = 0; i<numColors; i++){

  Oldx = set_x[i]
  Oldy = set_y[i]

   step1 = (Oldx - xB) * (yR - yB) - (Oldy - yB) * (xR - xB);
   step2 = (xG - xB) * (yR - yB) - (yG - yB) * (xR - xB);     
   step3 = step1 / step2;
   step4 = ((Oldx - xB) - step3 * (xG - xB)) / (xR - xB);
   step5 = 1.0 - step3 - step4;
   step6 = step4 * yR + step3 * yG + step5 * yB;

   GunPercentR = (step4 * yR) / step6;
   GunPercentG = (step3 * yG) / step6;
   GunPercentB = 1.0 - GunPercentR - GunPercentG;
  
   // This makes the chromaticity gray if it is outside the gammut of the monitor
   if (GunPercentR < 0.0){ GunPercentR = 0.0;}// print((i)+"\n");}
   if (GunPercentG < 0.0){ GunPercentG = 0.0;}// print((i)+"\n");}
   if (GunPercentB < 0.0){ GunPercentB = 0.0;}// print((i)+"\n");}


   var R = Math.pow(10.0,constantR)*(Math.pow((GunPercentR*set_Y[i]),slopeR))
   var G = Math.pow(10.0,constantG)*(Math.pow((GunPercentG*set_Y[i]),slopeG))
   var B = Math.pow(10.0,constantB)*(Math.pow((GunPercentB*set_Y[i]),slopeB))
   


  if(R < 0 || R > 255 || G < 0 || G > 255 || B < 0 || B > 255){
    R = 0;
    G = 0;
    B = 0;
  }


Rval[i] = Math.round(R)
Gval[i] = Math.round(G)
Bval[i] = Math.round(B)

}

// Set background color to gray - last color in calibration list //
document.body.style.backgroundColor = "rgb("+Rval[numColors-1]+","+Gval[numColors-1]+","+Bval[numColors-1]+")" 

rBackground = Rval[numColors-1]
gBackground = Gval[numColors-1]
bBackground = Bval[numColors-1]

var promptedColorR1 = Rval
var promptedColorG1 = Gval
var promptedColorB1 = Bval


return {"Red":promptedColorR1, "Green":promptedColorG1, "Blue":promptedColorB1}


//----------- END OF COLOR CALIBRATION -----------------// 
}


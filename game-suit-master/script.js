/*
Rules: 
Gunting vs Kertas = Menang Gunting // Scissors vs Paper = Scissors Win
Kertas vs Batu    = Menang Kertas // Paper vs rock = paper win
Batu VS Gunting   = Menang Batu // rock vs scissors = rock win

Jika Semua Pilihan Sama Maka Akan Seri Atau DRAW // If all the options are the same then this game will be series
Made By Dion Arya Pamungkas
*/

function fungsiku(pilihan_user){
  /*
  Pilihan Komputer, dengan men-generate angka random 1 - 3
  1 = Gunting //Scissors
  2 = Batu  //Rock
  3 = Kertas //Paper
  */
  var hasil = "";
  var pilihan_comp = Math.floor(Math.random() * 3) + 1;
  var comp = "";
  
  switch(pilihan_comp){
    case 1:
      comp = 'Gunting';
      if (pilihan_user == 'kertas'){
        hasil = "You Lose";
      }else if (pilihan_user == 'batu'){
        hasil = "You Win";
      }else{
        hasil = "Draw";
      }
      break;
      
    case 2:
      comp = 'Batu';
      if (pilihan_user == 'kertas'){
        hasil = "You Win";
      }else if (pilihan_user == 'gunting'){
        hasil = "You Lose";
      }else{
        hasil = "Draw";
      }
      break;
      
    case 3:
      comp = 'Kertas';
      if (pilihan_user == 'batu'){
        hasil = "You Lose";
      }else if (pilihan_user == 'gunting'){
        hasil = "You Win";
      }else{
        hasil = "Draw";
      }
      break;
      
    default:
      hasil = "Ada Kesalahan";
      break;
         }
  
  document.getElementById('hasil').innerHTML = hasil;
  var html_hasil = document.getElementById('hasil');
  
  if (hasil == 'You Lose'){
    html_hasil.style.backgroundColor = "red";
  }else if(hasil == 'You Win'){
    html_hasil.style.backgroundColor = 'blue';
  }else{
    html_hasil.style.backgroundColor = "yellow";
  }
  
  document.getElementById('hilang').style.display = "inline";
  document.getElementById('user1').innerHTML = pilihan_user;
  document.getElementById('comp').innerHTML = comp;
}

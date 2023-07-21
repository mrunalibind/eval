const nodemailer=require("nodemailer");
const client=require("../Connections/redis")

// let transporter= nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:"joestheticclub@gmail.com",
//         pass:"bhfhyuylyvzfjpls"
//     }

// });
async function main(email){
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user:"joestheticclub@gmail.com",
        pass:"bhfhyuylyvzfjpls" // generated ethereal password
      },
    });
  
    const otp = Math.floor(100000 + Math.random() * 900000);
    // client.set(otp,otp);

    let info = await transporter.sendMail ({
      from: 'joestheticclub@gmail.com', // sender address
      to: email, // list of receivers
      subject: "OTP Verification", // Subject line
      text: `Your OTP: ${otp}`, // plain text body
    });
    
}

module.exports={main};
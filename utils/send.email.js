const nodemailer = require('nodemailer');
require("dotenv").config();
const enc = require("../utils/enc");
const jwt = require('jsonwebtoken');

//LOAD MODELS
const logsModel = require("../models/logs.model");

const sendLoginCredentials = async(data)=>{
    var RECIEVER_EMAIL = data.RECIEVER_EMAIL;
    var LOGIN_PASSWORD = data.LOGIN_PASSWORD;


    const html = `    <!DOCTYPE html>
    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso]>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    <o:AllowPNG/>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
        <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        @media (max-width:520px) {
            .icons-inner {
            text-align: center;
            }

            .icons-inner td {
            margin: 0 auto;
            }

            .row-content {
            width: 100% !important;
            }

            .column .border {
            display: none;
            }

            table {
            table-layout: fixed !important;
            }

            .stack .column {
            width: 100%;
            display: block;
            }
        }
        </style>
    </head>
    <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
        <tbody>
            <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                    <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                        <tbody>
                            <tr>
                            <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tr>
                                    <td style="width:100%;padding-right:0px;padding-left:0px;">
                                    <div style="line-height:10px">
                                        <img alt="airchains_logo" src="https://airchains.io/assets/images/airChains_logo.png" style="display: block; height: auto; border: 0; width: 175px; max-width: 100%;" title="airchains_logo" width="175" />
                                    </div>
                                    </td>
                                </tr>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                <tr>
                                    <td style="padding-top:30px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                    <div style="color:#000000;font-size:14px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0px;">
                                        <p style="margin: 0; margin-bottom: 16px;">Hi ${data.NAME},</p>
                                        <p style="margin: 0; margin-bottom: 16px;">Your account has been created with Gems Education portal, please find your login credentials below</p>
                                        <p style="margin: 0; margin-bottom: 5px;"><b>Login Email:</b> ${RECIEVER_EMAIL}</p>
                                        <p style="margin: 0; margin-bottom: 16px;"><b>Login Password:</b> ${LOGIN_PASSWORD}</p>
                                    </div>
                                    </td>
                                </tr>
                                </table>
                                
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
        </table>
       
    </body>
    </html>`;

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_ADDRESS,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var message = {
        from: "no-reply@airchains.io <"+process.env.EMAIL_SEND+">",
        replyTo : process.env.EMAIL_SEND,
        to: data.RECIEVER_EMAIL,
        subject: "Account Created",
        html:html
    }

    await transporter.sendMail(message,async function (err, info) {
        if (err) {
            
            //IF ERROR

        } else {
           
            // EMAIL SET
        }
    
    });

    return true;

}

module.exports = {
    sendLoginCredentials
}
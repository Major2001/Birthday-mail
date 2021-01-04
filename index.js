const excelfile = require("read-excel-file/node");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

const sendMail = async (prop) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "da3e16003cc04e",
      pass: "d60ac9fa80e8a0",
    },
  });
  await transporter.sendMail({
    from: "BIT CYCLES",
    to: prop.email,
    subject: prop.subject,
    text: prop.message,
  });
};
const readExcelFile = async () => {
  const fileRows = await excelfile("./Birthday.xlsx");
  return fileRows;
};

const final = async () => {
  const fileRows = await readExcelFile();
  fileRows.forEach(async (row, i) => {
    if (i != 0) {
      schedule.scheduleJob(row[2], async () => {
        await sendMail({ email: row[1], subject: "hbd", body: "hbcd" });
      });
    }
  });
};

final().catch((err) => {
  console.log(err);
});

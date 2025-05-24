const { exec } = require("child_process");
exec(
  "",   /* Write your command here */
  (err, stdout, stderr) => {
    console.log(stdout);
  }
);

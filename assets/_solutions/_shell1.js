const { exec } = require("child_process");
exec(
  "ls",   /* Write your command here */
  (err, stdout, stderr) => {
    console.log(stdout);
  }
);

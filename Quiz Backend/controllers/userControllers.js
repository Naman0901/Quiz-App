const pool = require('../db');

exports.getquiz = async (req,res)=>{
    const quiz = await pool.query("select * from quiz");
    res.json(quiz.rows);
}

exports.getquestions = async(req,res)=>{
    const ques = await pool.query("select * from questions where test_id=$1",[req.params.id]);
    res.json(ques.rows);
}
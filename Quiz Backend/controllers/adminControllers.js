const pool = require('../db');

exports.addtest = async (req,res)=>{
    const test = await pool.query("insert into quiz(name) values ($1) returning *",[req.body.qname]);
    res.json(test.rows[0]);
}

exports.deltest = async (req,res)=>{
    const test = await pool.query("delete from quiz where id = $1",[req.params.id]);
    res.json("deleted");
}

exports.addquestion = async (req,res)=>{
    const ques = await pool.query("insert into questions(ques,answer,options,test_id) values ($1,$2,$3,$4) returning *",[req.body.ques,req.body.answer,req.body.options,req.body.test_id]);
    res.json(ques.rows[0]);
}

exports.getquestion = async(req,res)=>{
    const ques = await pool.query("select * from questions where test_id = $1",[req.params.id]);
    res.json(ques.rows);
}

exports.updquestion = async (req,res)=>{
    console.log(req.body);
    const {ques, answer, options} = req.body[0];
    const updquestion = await pool.query("update questions set ques = $1, answer = $2, options = $3 where id = ($4)", [ques,answer,options, req.params.id]);
    res.json("Question Updated");
}

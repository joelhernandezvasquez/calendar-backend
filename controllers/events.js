
const {response}  = require('express');
const Events = require('../models/Events');

const getEvents = async (req,res = response) =>{

    const events = await Events.find({}).populate('user','name');

    res.json({
        ok:true,
        events
    })
}

const createEvents = async (req,res = response) =>{

   const event = new Events(req.body);

   try{
    event.user = req.uid;

     const savedEvent = await event.save();
     res.json({
      ok:true,
      events:savedEvent
     }) 
   }
   catch(error){
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'talk to administrator'
    })
   }
    
  
}

const updateEvents = async (req,res=response) =>{

    const eventId = req.params.id;
    const uid = req.uid;


    try{
    const event = await Events.findById(eventId);
    console.log(event);
   if(!event){
    return res.status(404).json({
        ok:false,
        msg:'Event not found'
    })}

    if(event.user.toString() !== uid){
     return res.status(401).json({
        ok:false,
        msg:'you are not allowed to edit this event'
     })
    }
    const newEvent = {
        ...req.body,
        user:uid
    }

 const updatedEvent = await Events.findByIdAndUpdate(eventId,newEvent,{new:true});

 res.json({
    ok:true,
    event: updatedEvent
 })

   }
    
    catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'talk to administrator'
        })
    }


}

const deleteEvents =  async (req,res=response) =>{

    const eventId = req.params.id;
    const uid = req.uid;

    try{
        const event = await Events.findById(eventId);

        if(!event){
           return res.status(404).json({
                ok:false,
                msg:'Event not found'
            })}

            if(event.user.toString() !== uid){
                return res.status(401).json({
                   ok:false,
                   msg:'you are not allowed to elminate this event'
                })
               }

 await Events.findByIdAndDelete(eventId);

 res.json({
    ok:true
 })
        }

    
    catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'talk to administrator'
        })
    }

  
}
module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}
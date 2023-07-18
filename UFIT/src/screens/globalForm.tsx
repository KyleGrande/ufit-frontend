// TODO
// Extract user id from cookie

module.exports = {
    programName: null,
    programDescription: null,
    programCategory: null,
    programSessions: [],
    userId: 123, // hard coded guest 
  };

  /*
    UFIT SESSION object
    {
      sessionName: string
      restDays: int
      movements: []
    }
    UFIT Movement object
    {      
      section: string,
      movementName: string,
      movementDescription: string,
      movementLink: string,
      typeTracking: typeTrackingSchema,
      
    };

    Types of tracking data:
    
    Sets/Reps 
    trackingData: {
        sets:
        reps:
      }      
   
    Rounds Timer 
    trackingData: {
      rounds:
      roundsM:
      roundsS:
      restM:
      restS:        
    }
    
    General Countdown Timer 
    trackingData: {
        sets:
        reps:
      }      

  */
  
  
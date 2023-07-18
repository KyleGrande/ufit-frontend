// TODO
// Extract user id from cookie

module.exports = {
    userId: 123, // hard coded guest 
    programName: null,
    programDescription: null,
    programCategory: null,
    programSessions: [],
    sessions: [] // description of form session storage below
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
  
  
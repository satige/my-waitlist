exports.handler = async (event, context) => {
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxAKOw7-hNCkDd9kyo-XuFci03pWCKJc91UW99j9uhkGDOe2Z_3tg_AdBeVAPysJtPJJw/exec";
  
    try {
      const response = await fetch(googleScriptUrl);
      const data = await response.json();
  
      return {
        statusCode: 200,
        headers: {
          // Der magische Trick: Netlify speichert das Ergebnis für 60 Sekunden weltweit in Edge-Servern.
          // Der erste Besucher in der Minute wartet 6 Sekunden, alle anderen in der gleichen Minute warten 50 Millisekunden.
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
      };
    } catch (error) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "Fehler beim Abrufen der Daten" }) 
      };
    }
  };
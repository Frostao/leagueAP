package com.riotGames.api.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/matchdata")
public class testController {
	@RequestMapping(value="/{matchId}", method = RequestMethod.GET)
    public @ResponseBody JSONObject testControl(@PathVariable("matchId") String matchId, @RequestParam("authKey") String authKey) {
		JSONObject json = null;
		try {

			URL url = new URL("https://na.api.pvp.net/api/lol/na/v2.2/match/" + matchId + "?api_key=" + authKey);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output;
			System.out.println("Output from Server .... \n");
			while ((output = br.readLine()) != null) {
				System.out.println(output);
				json = (JSONObject)new JSONParser().parse(output);
			}
			
	
			conn.disconnect();

		  } catch (MalformedURLException e) {

			e.printStackTrace();

		  } catch (IOException e) {

			e.printStackTrace();

		  } catch (ParseException e) {
				System.out.println("The freaking JSON is wrong!!");
				// TODO Auto-generated catch block
				e.printStackTrace();
		  }
		return json;

    }
}
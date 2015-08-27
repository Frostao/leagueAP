package com.riotGames.api.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/matchdata")
public class testController {
	@RequestMapping(value="/{matchId}", method = RequestMethod.GET)
    public @ResponseBody JSONArray testControl(@PathVariable("matchId") String matchId, @RequestParam("authKey") String authKey) {
		JSONObject json = null;
		JSONArray participants = null;
		JSONObject participant = null;
		JSONObject items = null;
		JSONArray item_array = new JSONArray();
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
			
			while ((output = br.readLine()) != null) {
				json = (JSONObject)new JSONParser().parse(output);
				participants = (JSONArray) json.get("participants");
				for(int i = 0; i < participants.size(); i++) {
					participant = (JSONObject) participants.get(i);
					items = (JSONObject) participant.get("stats");
					
					item_array.add(participant.get("item6"));
					item_array.add(participant.get("item5"));
					System.out.println("ITEM 0 " + items.get("item0"));
					System.out.println("ITEM 1 " + items.get("item1"));
					System.out.println("ITEM 2 " + items.get("item2"));
					System.out.println("ITEM 3 " + items.get("item3"));
					System.out.println("ITEM 4 " + items.get("item4"));
					System.out.println("ITEM 5 " + items.get("item5"));
					System.out.println("ITEM 6 " + items.get("item"));
					
				}
			}
			conn.disconnect();

		  } catch (MalformedURLException e) {

			e.printStackTrace();

		  } catch (IOException e) {

			e.printStackTrace();

		  } catch (Exception e) {
				System.out.println("The freaking JSON is wrong!!");
				e.printStackTrace();
		  }
		return item_array;

    }
}
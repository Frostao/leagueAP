package com.riotGames.api.test;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class fetchItemIds {
	ArrayList<Champion> theJSON = new ArrayList<Champion>();
	public void main(String[] args) {
		JSONParser parser = new JSONParser();
		Set<String> set511 = new HashSet<String>();
		Set<String> set514 = new HashSet<String>();
		try {
			Object obj_511 = parser.parse(new FileReader("src/main/resources/NA_5.11.json"));
			Object obj_514 = parser.parse(new FileReader("src/main/resources/NA_5.14.json"));
			
			JSONArray JSON511 = (JSONArray) obj_511;
			JSONArray JSON514 = (JSONArray) obj_514;

			for(int i = 0; i < 3; i++) {
				//System.out.println("MatchID 5.11 " + i+1 + " "+ JSON511.get(i));
				set511.addAll(getItems(JSON511.get(i).toString()));
			}
			
			FileWriter writer = new FileWriter("src/main/resources/output.txt"); 
			for(String str: set511) {
			  writer.write(str+"\n");
			}
			writer.close();
			System.out.println(set511.toString());
		} catch (IOException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	public Set<String> getItems(String matchId) {
		String authKey = "3f914e0d-b4e8-4ed7-a977-e3af14a021a7";
		JSONObject json = null;
		JSONArray participants = null;
		JSONObject participant = null;
		JSONObject items = null;
		Set<String> set = null;
		List<String> listItems = new ArrayList<String>();
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
			int freq;
			
			while ((output = br.readLine()) != null) {
				json = (JSONObject)new JSONParser().parse(output);
				participants = (JSONArray) json.get("participants");
				participants = getTopFour(participants);
				for(int i = 0; i < participants.size(); i++) {
					participant = (JSONObject) participants.get(i);
					if(!isThereInJSON(participant.get("championId").toString())) {
						Champion c = new Champion();
						c.setId(participant.get("championId").toString());
						c.setFreq(0);
						c.setItems(new ArrayList<Item>());
						items = (JSONObject) participant.get("stats");
						List<Item> tempListOfItems = new ArrayList<Item>();
						for(int j = 0; j < 6; j++) {
							Item item = new Item(Integer.parseInt(items.get("item"+Integer.toString(j)).toString()), 0);
							tempListOfItems.add(item);
						}
						c.setItems(tempListOfItems);
					} else {
						for(int j = 0; j < theJSON.size(); j++) {
							
						}
					}
				}
			}
			set = new HashSet<String>(listItems);
			conn.disconnect();

		  } catch (Exception e) {
			e.printStackTrace();
		}
		return set;
	}
	
	public boolean isThereInJSON(String champId) {
		for(int i = 0; i < theJSON.size(); i++ ) {
			if(theJSON.get(i).getId().equals(champId)) {
				return true;
			}
		}
		return false;
	}
	
	
	private int compare(JSONObject o1, JSONObject o2) {
		// TODO Auto-generated method stub
		int magicD1 = Integer.parseInt(o1.get("magicDamageDealt").toString());
		int magicD2 = Integer.parseInt(o2.get("magicDamageDealt").toString());
		if (magicD1 > magicD2) {
			return 1;
		} else {
			return -1;
		}
	}
	
	@SuppressWarnings("unchecked")
	public JSONArray getTopFour(JSONArray participants) {
		JSONArray topFour = new JSONArray();
		
		//sort the 10 participants
		boolean swapped = true;
		int j = 0;
		JSONObject tmp;
		while (swapped) {
			swapped = false;
			j++;
			for (int i = 0; i < participants.size() - j; i++) {                                       
				if (compare((JSONObject)participants.get(i), (JSONObject)participants.get(i+1)) < 0) {                          
					tmp = (JSONObject)participants.get(i);
					participants.set(i, participants.get(i+1));
					participants.set(i+1, tmp);
					swapped = true;
				}
			}                
		}
		for(int i = 0; i < participants.size(); i++) {
			 JSONObject participant = (JSONObject) participants.get(i);
			 JSONObject stats = (JSONObject) participant.get("stats");
			 Integer.parseInt(stats.get("magicDamageDealt").toString());
			 //ChampionComparator a = new ChampionComparator();
			 //participants.sort(a);
		}
		return topFour;
	}
	
	
}


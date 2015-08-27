package com.riotGames.api.test;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
		//For a participant list
		JSONArray participants = null;
		//For each participant
		JSONObject participant = null;
		//For the stats of each participant
		JSONObject stats = null;
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
						//Intializing a new Champion which is not there in the JSON
						Champion c = new Champion();
						c.setId(participant.get("championId").toString());
						c.setFreq(0);
						c.setItems(new ArrayList<Item>());
						
						stats = (JSONObject) participant.get("stats");
						//List of items of a particular participant/new Champion
						List<Item> listOfItems = new ArrayList<Item>();
						for(int j = 0; j < 7; j++) {
							Item item = new Item(Integer.parseInt(stats.get("item"+Integer.toString(j)).toString()), 0);
							listOfItems.add(item);
						}
						c.setItems(listOfItems);
						theJSON.add(c);
					} else {
						for(int j = 0; j < theJSON.size(); j++) {
							if(theJSON.get(j).getId().equals(participant.get("championId").toString())) {
								stats = (JSONObject) participant.get("stats");
								theJSON.get(j).setFreq(theJSON.get(j).getFreq()+1);
								for(int k = 0; k < theJSON.get(j).getItems().size() ; k++) {
									for(int l = 0; l < 7; l++) {
										if(theJSON.get(j).getItems().get(k).getId() == Integer.parseInt(stats.get("item"+Integer.toString(l)).toString())) {
											theJSON.get(j).getItems().get(k).setFreq(theJSON.get(j).getItems().get(k).getFreq()+1);
										} else {
											Item new_Item = new Item(Integer.parseInt(stats.get("item"+Integer.toString(l)).toString()), 0);
											theJSON.get(j).getItems().add(new_Item);
										}
									}
								}
							}
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
}

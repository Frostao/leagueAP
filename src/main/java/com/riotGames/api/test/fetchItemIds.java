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
import com.google.gson.Gson;


public class fetchItemIds {
	//The main JSON - global variable(data source for the website)
	static ArrayList<Champion> theJSON = new ArrayList<Champion>();
	static int errors;
	
	public static void main(String[] args) {
		
//		getItems("1852548676");
//		getItems("1852558827");
//		getItems("1852559208");
//		System.out.println(theJSON.toString());
//		for(Champion c: theJSON) {
//			System.out.println(c.getId());
//			System.out.println(c.getFreq());
//			for(Item i: c.getItems()) {
//				System.out.println("Item "+i.getId());
//				System.out.println("Frequency "+ i.getFreq());
//			}
//		}
		
		JSONParser parser = new JSONParser();
		Set<String> set511 = new HashSet<String>();
		//Set<String> set514 = new HashSet<String>();
		//Not using yet
		try {
			Object obj_511 = parser.parse(new FileReader("src/main/resources/AP_ITEM_DATASET/5.14/RANKED_SOLO/EUW.json"));
			
			//Object obj_514 = parser.parse(new FileReader("src/main/resources/NA_5.14.json"));
			
			JSONArray JSON511 = (JSONArray) obj_511;
			//JSONArray JSON514 = (JSONArray) obj_514;

			for(int i = 0; i < JSON511.size(); i++) {
				//System.out.println("MatchID 5.11 " + i+1 + " "+ JSON511.get(i));
				getItems(JSON511.get(i).toString());
				
				//set511.addAll(theJSON);
			}
			
			String json = new Gson().toJson(theJSON);
			FileWriter writer = new FileWriter("src/main/resources/responses/EUW5.14RANKED.json"); 
			writer.write(json);
//			for(String str: set511) {
//			  writer.write(str+"\n");
//			}
			writer.close();
			System.out.println(set511.toString());
		} catch (IOException | ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
	
	public static void getItems(String matchId) {
		//Your authorization key
		String authKey = "c4cab17e-040e-4665-a19d-35cdae7275a3";
		//the json output from riot games api
		JSONObject json = null;
		//For a participant list
		JSONArray participants = null;
		//For each participant
		JSONObject participant = null;
		//For the stats of each participant
		JSONObject stats = null;
		
		//Set<String> set = null;
		//List<String> listItems = new ArrayList<String>();
		try {
			//Getting the data from the RG API
			URL url = new URL("https://euw.api.pvp.net/api/lol/euw/v2.2/match/" + matchId + "?api_key=" + authKey);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) {
				
				errors++;
				getItems(matchId);
				
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode() + "error No." + errors);
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output;
			//int freq;
			
			while ((output = br.readLine()) != null) {
				//RG API JSON 
				json = (JSONObject)new JSONParser().parse(output);
				//Getting the JSONArray of participants
				participants = (JSONArray) json.get("participants");
				//Getting Top four of the participants
				participants = getTopFour(participants);
				
				for(int i = 0; i < 4; i++) {
					//Getting each participant in the Top 4 list
					participant = (JSONObject) participants.get(i);
					//Checking whether this ^^ particular participant is there in the main JSON output or not 
					if(!isThereInJSON(participant.get("championId").toString())) {
						//Intializing a new Champion which is not there in the JSON
						Champion c = new Champion();
						c.setId(participant.get("championId").toString());
						c.setFreq(1);
						c.setItems(new ArrayList<Item>());
						
						stats = (JSONObject) participant.get("stats");
						c.setKills(Integer.parseInt(stats.get("kills").toString()));
						c.setDeaths(Integer.parseInt(stats.get("deaths").toString()));
						if(Boolean.parseBoolean(stats.get("winner").toString())) {
							c.setWins(1);
						}
						//List of items of a particular participant/new Champion
						List<Item> listOfItems = new ArrayList<Item>();
						for(int j = 0; j < 7; j++) {
							Item item = new Item(Integer.parseInt(stats.get("item"+Integer.toString(j)).toString()), 1);
							listOfItems.add(item);
						}
						c.setItems(listOfItems);
						theJSON.add(c);
					} else {
						//System.out.println(participant.get("championId").toString());
						//Iterating over the JSON to get the match Object for the current participant that exists in the the JSON
						for(int j = 0; j < theJSON.size(); j++) {
							if(theJSON.get(j).getId().equals(participant.get("championId").toString())) {
								stats = (JSONObject) participant.get("stats");
								theJSON.get(j).setFreq(theJSON.get(j).getFreq()+1);
								theJSON.get(j).setKills(Integer.parseInt(stats.get("kills").toString())+theJSON.get(j).getKills());
								theJSON.get(j).setDeaths(Integer.parseInt(stats.get("deaths").toString())+theJSON.get(j).getDeaths());
								
								if(Boolean.parseBoolean(stats.get("winner").toString())) {
									theJSON.get(j).setWins(theJSON.get(j).getWins()+1);
								}
								
								for(int k = 0; k < 7 ; k++) {
									for(int l = 0; l < theJSON.get(j).getItems().size(); l++) {
										if(theJSON.get(j).getItems().get(l).getId() == Integer.parseInt(stats.get("item"+Integer.toString(k)).toString())) {
											//System.out.println("Found a match item");
											theJSON.get(j).getItems().get(l).setFreq(theJSON.get(j).getItems().get(l).getFreq()+1);
											break;
										} else if (l == theJSON.get(j).getItems().size() - 1){
											Item new_Item = new Item(Integer.parseInt(stats.get("item"+Integer.toString(k)).toString()), 1);
											theJSON.get(j).getItems().add(new_Item);
											break;
										}
										
									}
								}
								break;
							}
						}
					}
				}
			}
			conn.disconnect();

		  } catch (Exception e) {
			e.printStackTrace();
		}
	}
	//Iteration over THE JSON
	public static boolean isThereInJSON(String champId) {
		for(int i = 0; i < theJSON.size(); i++ ) {
			if(theJSON.get(i).getId().equals(champId)) {
				return true;
			}
		}
		return false;
	}
	
	private static int compare(JSONObject o1, JSONObject o2) {
		// TODO Auto-generated method stub
		
		int magicD1 = Integer.parseInt(((JSONObject)o1.get("stats")).get("magicDamageDealt").toString());
		int magicD2 = Integer.parseInt(((JSONObject)o2.get("stats")).get("magicDamageDealt").toString());
		if (magicD1 > magicD2) {
			return 1;
		} else {
			return -1;
		}
	}
	
	@SuppressWarnings("unchecked")
	public static JSONArray getTopFour(JSONArray participants) {
		
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
		return participants;
	}
}

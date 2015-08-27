package com.riotGames.api.test;

import java.util.List;

public class Champion {
	private String id;
	private int freq;
	private int kills;
	private int wins;
	private int deaths;
	private List<Item> items;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getFreq() {
		return freq;
	}
	public void setFreq(int freq) {
		this.freq = freq;
	}
	public List<Item> getItems() {
		return items;
	}
	public void setItems(List<Item> items) {
		this.items = items;
	}
	public void setKills(int kills) {
		this.kills = kills;
	}
	public int getKills(){
		return kills;
	}
	public void setWins(int wins) {
		this.wins = wins;
	}
	public int getWins() {
		return wins;
	}
	public void setDeaths(int deaths) {
		this.deaths = deaths;
	}
	public int getDeaths() {
		return deaths;
	}
}

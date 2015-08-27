package com.riotGames.api.test;

import java.util.List;

public class Champion {
	private String id;
	private int freq;
	private int totalMagicDamageDealt;
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
	public int compare(Champion d, Champion d1){
	      return d.totalMagicDamageDealt - d1.totalMagicDamageDealt;
	}
	public int getTotalMagicDamageDealt() {
		return totalMagicDamageDealt;
	}
	public void setTotalMagicDamageDealt(int totalMagicDamageDealt) {
		this.totalMagicDamageDealt = totalMagicDamageDealt;
	}
}

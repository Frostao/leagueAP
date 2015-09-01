package com.riotGames.api.test;

public class Item {
	
	private int id;
	private int freq;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getFreq() {
		return freq;
	}
	public void setFreq(int freq) {
		this.freq = freq;
	}
	public Item(int id, int freq) {
		super();
		this.id = id;
		this.freq = freq;
	}
	
}

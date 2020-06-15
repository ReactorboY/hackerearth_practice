package com.organicpy.loveshayarihindi.imagestatus.Adapter;

import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class ShayariAdapter extends RecyclerView.Adapter<ShayariAdapter.ShayariViewHolder> {
    @NonNull
    @Override
    public ShayariViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return null;
    }

    @Override
    public void onBindViewHolder(@NonNull ShayariViewHolder holder, int position) {

    }

    @Override
    public int getItemCount() {
        return 0;
    }

    public static class ShayariViewHolder extends RecyclerView.ViewHolder {
        public ShayariViewHolder(@NonNull View itemView) {
            super(itemView);
        }
    }
}

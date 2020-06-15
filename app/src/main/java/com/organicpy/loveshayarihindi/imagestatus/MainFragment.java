package com.organicpy.loveshayarihindi.imagestatus;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.google.android.material.card.MaterialCardView;

public class MainFragment extends Fragment implements View.OnClickListener{
    MaterialCardView loveCard, friendshipCard,romanceCard,rateCard,sadCard, quoteCard;
    NavController controller;
    public MainFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_main, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        // Initialise the cards
        loveCard = view.findViewById(R.id.love_card);
        romanceCard = view.findViewById(R.id.romance_card);
        friendshipCard = view.findViewById(R.id.friendship_card);
        rateCard = view.findViewById(R.id.rate_card);
        sadCard = view.findViewById(R.id.sad_card);
        quoteCard = view.findViewById(R.id.quotes_card);
        // Set listeners on card
        loveCard.setOnClickListener(this);
        friendshipCard.setOnClickListener(this);
        rateCard.setOnClickListener(this);
        sadCard.setOnClickListener(this);
        romanceCard.setOnClickListener(this);
        quoteCard.setOnClickListener(this);

        controller = Navigation.findNavController(view);
    }

    private void letsNavigate(int id) {
        controller.navigate(id);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.love_card:
                letsNavigate(R.id.action_mainFragment_to_loveFragment);
                break;
        }
    }
}
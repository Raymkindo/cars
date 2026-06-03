<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contact_inquiries', function (Blueprint $table) {
            $table->foreignId('dealer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('car_id')->nullable()->constrained('cars')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_inquiries', function (Blueprint $table) {
            $table->dropForeign(['dealer_id']);
            $table->dropColumn('dealer_id');
            $table->dropForeign(['car_id']);
            $table->dropColumn('car_id');
        });
    }
};
